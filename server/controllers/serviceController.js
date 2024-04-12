const uuid = require('uuid');
const path = require('path');
const { Service } = require('../models/models');
const ApiError = require('../error/ApiError');

class ServiceController {
	async create(req, res, next) {
		try {
			let { name, subtitle, description, price, typeId} = req.body;
			const { img } = req.files;
			let fileName = uuid.v4() + '.jpg';
			img.mv(path.resolve(__dirname, '..', 'static', fileName));
			const service = await Service.create({
				name,
				subtitle,
				description,
				price,
				typeId,
				img: fileName,
			});

			return res.json(service);
		} catch (e) {
			next(ApiError.badRequest(e.message));
		}
	}

	async getAll(req, res) {
		let { typeId } = req.query;
		let services;
		if (!typeId) {
			services = await Service.findAll();
		}	else {services = await Service.findAll({
				where: { typeId }})
			}

		return res.json(services);
	}

	async getOne(req, res) {
		const { id } = req.params;
		const service = await Service.findOne({
			where: { id },
		});
		return res.json(service);
	}
}

module.exports = new ServiceController();
