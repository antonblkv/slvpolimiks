const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, List } = require('../models/models');

const generateJwt = (id, phone, role) => {
	return jwt.sign({ id, phone, role }, process.env.SECRET_KEY, {
		expiresIn: '24h',
	});
};

class UserController {
	async registration(req, res, next) {
		const { phone, password, role } = req.body;
		if (!phone || !password) {
			return next(ApiError.badRequest('Некорректный номер телефона или пароль'));
		}

		const candidate = await User.findOne({ where: { phone } });
		if (candidate) {
			return next(ApiError.badRequest('Пользователь с таким номером телефона уже существует'));
		}
		const hashPassword = await bcrypt.hash(password, 5);
		const user = await User.create({ phone, role, password: hashPassword });
		const list = await List.create({ userId: user.id });
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
