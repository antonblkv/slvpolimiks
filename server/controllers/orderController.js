const { Order, User } = require('../models/models');
const ApiError = require('../error/ApiError');

class OrderController {
	async create(req, res, next) {
		try {
			let { name, phone, comment, serviceId } = req.body;

			let user = await User.findOne({ where: { phone } });

			if (!user) {
				user = await User.create({ phone, name });
			}

			let userId = user.id;

			const order = await Order.create({
				userId,
				comment,
				serviceId,
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

	async delete(req, res, next) {
		try {
			const { id } = req.params;
			const order = await Order.findOne({
				where: { id },
			});
			if (order) {
				await Order.destroy({
					where: { id },
				});
				return res.status(200).json({ message: 'Deleted successfully' });
			}
			throw new Error('There is no device with this ID');
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async update(req, res, next) {
		let { id, serviceId, status } = req.body;

		const order = await Order.findOne({
			where: { id },
		});

		if (serviceId && serviceId != 0) {
			await order.update({ serviceId });
		}


		if (status && status != 0) {
			await order.update({ status });
		}

		return res.json(order);
	}
}

module.exports = new OrderController();
