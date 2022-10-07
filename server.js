 //Backend
 //Importar dependencias
 
 import express from "express"
 import bcrypt from "bcrypt"
 import Stripe from "stripe"
 import { initializeApp } from 'firebase/app'
 import { getFirestore } from 'firebase/firestore'
 
 //Configuracion de firebase

 const firebaseConfig = {
apiKey: "AIzaSyBbVPOWM313AOysb8b4l2NTRFXa9olc0zI",
  authDomain: "jgrcecommerce.firebaseapp.com",
  projectId: "jgrcecommerce",
  storageBucket: "jgrcecommerce.appspot.com",
  messagingSenderId: "246296607364",
  appId: "1:246296607364:web:16c8445156ceb586e2e0d1"
 }

 const firebase = initializeApp(firebaseConfig)
 const db = getFirestore()
//Inicializacion del servidor
 const app = express()

 //middleware
 app.use(express.static('public'))
 app.use(express.json()) //permite compartir forms

 //routes
 //ruta home app se usa porque así se llama la constante de express, get para obtener
 app.get('/', (req, res) => {
    res.sendFile('index.html', {root: 'public'})
 })

 app.listen(3000, () => {
    console.log('Servidor en ejecución...')
 })