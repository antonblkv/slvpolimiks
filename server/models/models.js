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

const List = sequelize.define('list', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const ListedService = sequelize.define('list_service', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Service = sequelize.define('service', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
	subtitle: { type: DataTypes.STRING },
	description: { type: DataTypes.STRING },
	price: { type: DataTypes.INTEGER, allowNull: false },
	img: { type: DataTypes.STRING, allowNull: false },
});

const Type = sequelize.define('type', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Portfolio = sequelize.define('portfolio', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	name: { type: DataTypes.STRING, unique: true },
	description: { type: DataTypes.STRING },
});

const Review = sequelize.define('review', {
	id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
	description: { type: DataTypes.STRING },
});

User.hasOne(List);
List.belongsTo(User);

User.hasMany(Review);
Review.belongsTo(User);

List.hasMany(ListedService);
ListedService.belongsTo(List);

Type.hasMany(Service);
Service.belongsTo(Type);

Service.hasMany(Review);
Review.belongsTo(Service);

Service.hasMany(ListedService);
ListedService.belongsTo(Service);

module.exports = {
	User,
	List,
	ListedService,
	Service,
	Type,
	Review,
	Portfolio,
};
