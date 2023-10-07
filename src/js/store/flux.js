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
					body: JSON.stringify({...contact, "agenda_slug": "Zeckrox"}),
					headers:{'Content-Type': 'application/json'}})
				setStore({...store, contactList:[...store.contactList, {...contact, "agenda_slug": "Zeckrox"}]});
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

			contactsLoad: (json) => {
				const store = getStore();
				setStore({contactList:json})
			},
		}
	};
};

export default getState;
