import close from '../../images/close.svg';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { fetchTypes } from '../../http/serviceAPI';
import { Context } from '../../index';
import '../../styles/createService.css';
import { deleteType } from '../../http/serviceAPI';

const DeleteType = observer(({ show, onHide }) => {
	const { service } = useContext(Context);

	useEffect(() => {
		fetchTypes().then(data => service.setTypes(data));
	}, []);

	const deleteThisType = (id) => {
		deleteType(id).then(() => onHide());
		window.location.reload();
	}

	return (
		<Modal show={show} onHide={onHide} centered>
			<div className='modal-header'>
				<div className='modal-title'>Все категории</div>
				<img className='modal-x' src={close} alt='Закрыть' onClick={onHide} />
			</div>
			<div className='modal-body'>
				{service.types.map(type => (
					<div className='delete-type'>
						<div className='delete-type-name'>{type.name}</div>
						<button className='button-delete-type' onClick={() => deleteThisType(type.id)}>
							Удалить
						</button>
					</div>
				))}
			</div>
		</Modal>
	);
});

export default DeleteType;
