import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/createContact.css";

  export const EditContact = () => {
  const { id } = useParams(); // Obtén el ID del contacto de la URL
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();


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
 
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const saveChanges = () => {
    if (id) {
      
      const updatedContactData = {
        full_name: contact.full_name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
        agenda_slug: "gonchip", 
      };

      
      fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
        method: "PUT",
        body: JSON.stringify(updatedContactData),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            console.error("Error al actualizar el contacto");
            throw Error(response.statusText);
          }
          return response.json();
        })
        .then((updatedContact) => {
          
          const updatedContactList = store.contactList.map((c) =>
            c.id === id ? updatedContact : c
          );

          actions.contactsLoad(updatedContactList); 
          navigate("/");
        })
        .catch((error) => {
          console.error("Error en la solicitud de edición:", error);
          navigate("/");
        });
    } else {
      
    }
  };

  return (
    <div className="container-div">
      <h1>Edit Contact</h1>

      <div className="input-holder">
        <input
          type="text"
          name="full_name"
          value={contact.full_name}
          onChange={handleInputChange}
          placeholder="Full name"
        />
      </div>

      <div className="input-holder">
        <input
          type="email"
          name="email"
          value={contact.email}
          onChange={handleInputChange}
          placeholder="Enter Email"
        />
      </div>

      <div className="input-holder">
        <input
          type="tel"
          name="phone"
          value={contact.phone}
          onChange={handleInputChange}
          placeholder="Enter Phone"
        />
      </div>

      <div className="input-holder">
        <input
          type="text"
          name="address"
          value={contact.address}
          onChange={handleInputChange}
          placeholder="Enter Address"
        />
      </div>

      <button onClick={saveChanges}>Save Changes</button>

      <Link to="/">Get Back to Contacts</Link>
    </div>
  );
};

export default EditContact;