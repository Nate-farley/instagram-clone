import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue }from "./lib/firebase";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <FirebaseContext.Provider value={{ firebase, FieldValue }}>
            <App />
      </FirebaseContext.Provider>
  </React.StrictMode>
);


// client side rendered aoo:  react (cra)

    //  database which is firebase

    // react-loading-skeleton

    // tailwind
  
// architecture

    // components, 
    // constants, 
    // context, 
    // helpers 
    // lib(firebase is going to live in here)
    // service (firebase function in here)
    // sytles (talwind's folder (app/tailwind)