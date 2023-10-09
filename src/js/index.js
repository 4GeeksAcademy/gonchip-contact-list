import { faLocationDot, faPhone, faEnvelope, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

import React from 'react'
import {createRoot} from 'react-dom/client'
import { library } from "@fortawesome/fontawesome-svg-core"

library.add(faLocationDot, faPhone, faEnvelope, faPencil, faTrash)

//include your index.scss file into the bundle
import "../styles/index.css";

//import your own components
import Layout from './layout.js'

//
const root = createRoot(document.querySelector("#app"))

//render your react application
root.render(<Layout/>)


