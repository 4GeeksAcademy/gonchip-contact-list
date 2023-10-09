import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";
import { Link, useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

export const Home = props => {
	const { store, actions } = useContext(Context);

	
	const [contact, setContact] = useState({
		full_name: "",
		email: "",
		phone: "",
		address: "",
	});

	const loadContactData = () => {
		fetch("https://playground.4geeks.com/apis/fake/contact/agenda/gonchip")
			.then((response) => {
				if (!response.ok) {
					console.error("No se pudieron cargar los contactos")
					throw Error(response.statusText)
				}
				return response.json()
			})
			.then((responseAsJson) => {
				actions.contactsLoad(responseAsJson)
			})
			.catch((error) => {
				console.error("Error al cargar los contactos:", error)
			});
	};

	useEffect(() => {
		loadContactData()
	}, []);


	return (
		<div className="text-center mt-5">
			{store.contactList.map((contact) => (
				<ContactCard
					key={contact.id}
					id={contact.id}
					full_name={contact.full_name}
					address={contact.address}
					phone={contact.phone}
					email={contact.email}
					trash={() => actions.deleteContact(contact)}
					pencil={() => actions.editContact(contact)}
				>

					<Link to={contact.id ? `/editContact/${contact.id}` : ""}>
						<FontAwesomeIcon icon={faPencil} />
					</Link>
				</ContactCard>
			))}
		</div>
	);
};