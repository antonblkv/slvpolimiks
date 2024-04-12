import { makeAutoObservable } from 'mobx';

export default class ServiceStore {
	constructor() {
		this._types = [];
		this._services = [];
		this._selectedType = {};
		makeAutoObservable(this);
	}

	setTypes(types) {
		this._types = types;
	}

	setServices(services) {
		this._services = services;
	}

	setSelectedType(type) {
		this._selectedType = type;
	}

	get types() {
		return this._types;
	}

	get services() {
		return this._services;
	}

	get selectedType() {
		return this._selectedType;
	}
}
