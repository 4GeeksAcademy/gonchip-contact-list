import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams, Link, useNavigate } from "react-router-dom";
import "../../styles/createContact.css";

export const CreateContact = () => {
  const { id } = useParams(); // Obtén el ID del contacto de la URL
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  // Estado para almacenar la información del contacto
  const [contact, setContact] = useState({
    full_name: "",
    email: "",
    phone: "",
    address: "",
  });

  // Función para cargar la información del contacto a editar (si existe)
  useEffect(() => {
    if (id) {
      // Si hay un ID en la URL, intenta encontrar el contacto en el estado global
      const contactToEdit = store.contactList.find((c) => c.id === id);
      if (contactToEdit) {
        // Si se encontró el contacto, actualiza el estado local con sus datos
        setContact({
          full_name: contactToEdit.full_name,
          email: contactToEdit.email,
          phone: contactToEdit.phone,
          address: contactToEdit.address,
        });
      }
    }
  }, [id, store.contactList]);

  // Función para manejar cambios en los campos de entrada
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  
  const saveChanges = () => {
    if (id) {
      
      const contactId = id; 
      const updatedContactData = {
        full_name: contact.full_name,
        email: contact.email,
        phone: contact.phone,
        address: contact.address,
		agenda_slug: "my_super_agenda",
      };

      // Realiza una solicitud PUT para actualizar el contacto en tu API o sistema de backend
      fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
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
          // Actualiza el contacto en el estado global con los datos editados
          const updatedContactList = store.contactList.map((c) =>
            c.id === contactId ? updatedContact : c
          );

          actions.contactsLoad(updatedContactList); // Actualiza la lista de contactos en el estado global
		  navigate("/");
        })
        .catch((error) => {
          console.error("Error en la solicitud de edición:", error);
		  navigate("/")
        });
    } else {
      // Si no hay un ID, significa que estamos creando un nuevo contacto
      const response = actions.createContact(contact); // Llama a la acción de creación
      if (response) {
        // Redirige a la página de inicio después de crear
        // Aquí utilizamos el componente Link para la navegación
        return <Link to="/">Get Back to Contacts</Link>;
      } else {
        alert("Completa todos los campos."); // Muestra una alerta si no se completan los campos
      }
	  navigate("/")
    }
  };


	return (
		<div className="container-div">
			<h1>{id ? "Edit Contact" : "Add a New Contact"}</h1>

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

			<button onClick={saveChanges}>
				{id ? "Save Changes" : "Save"}
			</button>

			<Link to="/">Get Back to Contacts</Link>
		
		</div>
	);
};