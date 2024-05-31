const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	phone: { type: DataTypes.STRING, unique: true, allowNull: false },
	password: { type: DataTypes.STRING },
	email: { type: DataTypes.STRING, unique: true },
	role: { type: DataTypes.STRING, defaultValue: 'USER' },
	name: { type: DataTypes.STRING },
});

const Order = sequelize.define('order', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	comment: { type: DataTypes.STRING },
	status: { type: DataTypes.ENUM('Зарегистрирована',
	 'В очереди', 'В работе', 'Выполнена', 'Отклонена'),
	  defaultValue: 'Зарегистрирована' },
});

const Service = sequelize.define('service', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	description: { type: DataTypes.STRING },
	price: { type: DataTypes.INTEGER, allowNull: false },
	img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

User.hasMany(Order);
Order.belongsTo(User);

Service.hasMany(Order);
Order.belongsTo(Service);

Type.hasMany(Service);
Service.belongsTo(Type);

module.exports = {
	User,
	Order,
	Service,
	Type
};
