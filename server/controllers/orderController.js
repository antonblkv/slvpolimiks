const { Order, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');

class OrderController {
	async create(req, res, next) {
		try {
			let { name, phone, comment } = req.body;

			let user = await User.findOne({ where: { phone } });

			if (!user)  {
				 user = await User.create({ phone, name })
			}

			let userId = user.id;

				const order = await Order.create({
					userId,
					comment,
				});
			
			return res.json(order);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		const orders = await Order.findAll();

		return res.json(orders);
	}
}

module.exports = new OrderController();
