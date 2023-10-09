import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faPhone, faEnvelope, faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom"


export const ContactCard = (contact) => {

    return <><div className="contact-div">
        <img className="contact-photo" src="https://picsum.photos/id/64/4326/4000" alt="Contact image" />
        <div className="d-flex w-100 justify-content-between">
            <span className="left-span">
                <span>
                    <h3>{contact.full_name}</h3>
                </span>
                <span className="inside-span">
                    <FontAwesomeIcon icon={faLocationDot} />
                    <p>{contact.address}</p>
                </span>
                <span className="inside-span">
                    <FontAwesomeIcon icon={faPhone} />
                    <p>{contact.phone}</p>
                </span>
                <span className="inside-span">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <p>{contact.email}</p>
                </span>
            </span>

            <span className="right-span">
                <Link to={`/editContact/${contact.id}`}>
                    <FontAwesomeIcon icon={faPencil} />
                </Link>
                <FontAwesomeIcon icon={faTrashCan} onClick={contact.trash} />
            </span>

        </div>
    </div>
    </>
}