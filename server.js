 //Backend
 //Importar dependencias
 
 import express from "express"
 import bcrypt from "bcrypt"
 import Stripe from "stripe"
 import { initializeApp } from 'firebase/app'
 import { collection, getDoc, getFirestore } from 'firebase/firestore'
 
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
//Ruta para registrar
app.get('/signup', (req, res) =>{
   res.sendFile('signup.html', {root: 'public'})
})

app.post('/signup', (req, res) => {
   const { name, email, password, number, tac } = req.body

   //Validaciones
   if(name.length < 3){
      res.json(('alert', 'name must be 3 letters long'))
   }else if(email.length){
      res.json(('alert', 'enter your email'))
   }else if(password.length < 8 ){
      res.json('alert', 'password must be 8 letters long')
   }else if(!Number(number) || number.length < 10 ){
      res.json(('alert', 'invalid number, please enter valid one'))
   }else if(!tac){
      res.json(('alert', 'you must agree to our terms'))
   }else{
      //Almacenar datos en BD
      const users = collection(db, "users")
      getDoc(doc(users, email)).then(user => {
         if(user.exists()){
            res.json({'alert': 'email already exists'})
         }else{
            //encriptar password
         }
      })
   }
})

 //listen siempre hasta el final
 app.listen(3000, () => {
    console.log('Servidor en ejecución...')
 })