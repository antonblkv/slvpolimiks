const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

const generateJwt = (id, phone, role) => {
	return jwt.sign({ id, phone, role }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	});
};

class UserController {
	async registration(req, res, next) {
		const { phone, password, role } = req.body;
		const hashPassword = await bcrypt.hash(password, 5);

		if (!phone || !password) {
			return next(ApiError.badRequest('Некорректный номер телефона или пароль'));
		}

		let user = await User.findOne({ where: { phone } });

		if (user) {
			if (user.password === null) {
				await user.update({ password: hashPassword });
				const token = generateJwt(user.id, user.phone, user.role);
				return res.json({ token });
			}
			return next(ApiError.badRequest('Пользователь с таким номером телефона уже существует'));
		}


		user = await User.create({ phone, role, password: hashPassword });
		const token = generateJwt(user.id, user.phone, user.role);
		return res.json({ token });
	}

	async login(req, res, next) {
		const { phone, password } = req.body;
		const user = await User.findOne({ where: { phone } });
		if (!user) {
			return next(ApiError.internal('Пользователь не найден'));
		}
		let comparePassword = bcrypt.compareSync(password, user.password);
		if (!comparePassword) {
			return next(ApiError.internal('Указан неверный пароль'));
		}
		const token = generateJwt(user.id, user.phone, user.role);
		return res.json({ token });
	}

	async updateUser(req, res, next) {
		let { name, phone, email, password } = req.body;
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const id = decoded.id;

		const user = await User.findOne({
			where: { id },
		});

		if (name) {
			await user.update({ name });
		}

		if (password) {
			password = await bcrypt.hash(password, 5);
			await user.update({ password });
		}

		if (phone) {
			await user.update({ phone });
		}

		if (email) {
			await user.update({ email });
		}

		return res.json(user);
	}

	async getOneUser(req, res, next) {
		const token = req.headers.authorization.split(' ')[1];
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		const id = decoded.id;
		const user = await User.findOne({
			where: { id },
		});
		return res.json(user);
	}

	async check(req, res, next) {
		const token = generateJwt(req.user.id, req.user.phone, req.user.role);
		return res.json({ token });
	}
}

module.exports = new UserController();
