import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/modal.css";

export const EditModal = (modal) => {
	const { store, actions } = useContext(Context);
	const [contact, setContact] = useState({
		full_name: "",
		email: "",
		phone: "",
		address: "",
	})
	function saveEdit() {
		actions.editContact(modal.contact, contact);
		modal.onClose()

	}

	return (
		<div style={{ position: "absolute", visibility: modal.visibility ? "" : "hidden" }}>
			{/* <div className="modal-background"></div> */}
			<div className="modal">
				<span className="modal-inside">
					<h2>Edit contact</h2>
					<label>Full name</label>
					<input placeholder={modal.contact.full_name} onChange={(text) => setContact({ ...contact, full_name: text.target.value })}></input>
					<label>Email</label>
					<input placeholder={modal.contact.email} onChange={(text) => setContact({ ...contact, email: text.target.value })}></input>
					<label>Phone</label>
					<input placeholder={modal.contact.phone} onChange={(text) => setContact({ ...contact, phone: text.target.value })}></input>
					<label>Address</label>
					<input placeholder={modal.contact.address} onChange={(text) => setContact({ ...contact, address: text.target.value })}></input>
					<span style={{ display: "flex", justifyContent: "flex-end" }}>
						<button data-target="#demo" onClick={() => { modal.onClose() }}>Discard changes</button>
						<button onClick={() => { saveEdit() }}>Save</button>
					</span>
				</span>
			</div>
		</div>
	)
};