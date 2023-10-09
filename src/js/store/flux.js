const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			contactList: [
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			createContact: (contact) => {
				const store = getStore();
				if(contact.full_name=="" || contact.email=="" || contact.phone=="" || contact.address=="")return false
				fetch('https://playground.4geeks.com/apis/fake/contact/', {
					method: "POST",
					body: JSON.stringify({...contact, "agenda_slug": "gonchip"}),
					headers:{'Content-Type': 'application/json'}})
				setStore({...store, contactList:[...store.contactList, {...contact, "agenda_slug": "gonchip"}]});
				return true
			},

			deleteContact: (elm) => {
				const store = getStore();
				fetch('https://playground.4geeks.com/apis/fake/contact/'+elm.id, {
					method: "DELETE",
					headers:{'Content-Type': 'application/json'}})
				setStore({...store , contactList: store.contactList.filter(contacts => contacts.id != elm.id)})
			},

			editContact:(currentContact, contactNewInfo)=>{
				const store = getStore();
				let searchContact = store.contactList.find(person => currentContact.id == person.id)
				if(searchContact){
					contactNewInfo.full_name!=""? searchContact.full_name = contactNewInfo.full_name : ""
					contactNewInfo.email!=""? searchContact.email = contactNewInfo.email : ""
					contactNewInfo.phone!=""? searchContact.phone = contactNewInfo.phone : ""  
					contactNewInfo.address!=""?searchContact.address = contactNewInfo.address : ""
					setStore("")

				fetch('https://playground.4geeks.com/apis/fake/contact/'+currentContact.id, {
				method: "PUT",
				body: JSON.stringify(searchContact),
				headers:{'Content-Type': 'application/json'}})
				}
				return true
			},

			
  editContact: (contact) => {
    const store = getStore();
    // Obtén el ID del contacto que se va a editar
    const contactId = contact.id;

    // Construye el objeto de datos para la solicitud de edición
    const updatedContactData = {
      full_name: contact.full_name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    };

    // Realiza una solicitud PUT para editar el contacto en tu API o sistema de backend
    fetch(`https://playground.4geeks.com/apis/fake/contact/${contactId}`, {
      method: "PUT",
      body: JSON.stringify(updatedContactData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (!response.ok) {
          console.error("Error al editar el contacto");
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((editedContact) => {
        // Actualiza el contacto en el estado global con los datos editados
        const updatedContactList = store.contactList.map((c) =>
          c.id === contactId ? editedContact : c
        );

        setStore({
          contactList: updatedContactList,
        });
      })
      .catch((error) => {
        console.error("Error en la solicitud de edición:", error);
      });
  },

			contactsLoad: (json) => {
				const store = getStore();
				setStore({contactList:json})
			},
		}
	};
};

export default getState;