const { Order, User } = require('../models/models');
const ApiError = require('../error/ApiError');
const { where } = require('sequelize');

class OrderController {
	async create(req, res, next) {
		try {
			let { name, phone, comment, serviceId } = req.body;

			let user = await User.findOne({ where: { phone } });

			if (!user)  {
				 user = await User.create({ phone, name })
			}

			let userId = user.id;

				const order = await Order.create({
					userId,
					comment,
					serviceId
				});
			
			return res.json(order);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		let { userId } = req.query;
		let orders;
		if (!userId) {
			orders = await Order.findAll();
		} else {
			orders = await Order.findAll({
				where: { userId },
			});
		}

		return res.json(orders);
	}
}

module.exports = new OrderController();
