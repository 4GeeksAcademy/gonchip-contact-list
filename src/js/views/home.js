import React, { useState, useEffect, useContext } from "react";
import "../../styles/home.css";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";

export const Home = props => {
	const { store, actions } = useContext(Context);
	const [ visible, setVisible ] = useState("hidden")

	return (<div className="text-center mt-5">
		{store.contactList.map((contact)=>(
		<ContactCard
			key={contact.id}
			id={contact.id}
			full_name={contact.full_name}
			address={contact.address}
			phone={contact.phone}
    		email={contact.email}
			trash={()=>actions.deleteContact(contact)}
			pencil={()=>visible? setVisible(""):setVisible("hidden")}
			visibility={visible}
			/>))}
	</div>)}
;