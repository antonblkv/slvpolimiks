import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import ServiceItem from "./ServiceItem";

const ServiceList = observer(() => {
    const { service } = useContext(Context)

    return (
			<div class='container-catalog'>
				{service.services.map(service => (
					<ServiceItem key={service.id} service={service} />
				))}
			</div>
		);
});

export default ServiceList;
