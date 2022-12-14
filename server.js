import express from 'express'
import bcrypt from 'bcrypt'
import stripe from 'stripe'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, collection, setDoc, getDoc, updateDoc, getDocs, query, where } from 'firebase/firestore'

//Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBbVPOWM313AOysb8b4l2NTRFXa9olc0zI",
  authDomain: "jgrcecommerce.firebaseapp.com",
  projectId: "jgrcecommerce",
  storageBucket: "jgrcecommerce.appspot.com",
  messagingSenderId: "246296607364",
  appId: "1:246296607364:web:16c8445156ceb586e2e0d1"
};

const firebase = initializeApp(firebaseConfig)
const db = getFirestore()

//inicialización del servidor
const app = express()

//middleware
app.use(express.static('public'))
app.use(express.json()) // permite compartir forms

// Rutas
// Ruta Home
app.get('/', (req, res) => {
	res.sendFile('index.html', { root: 'public'})
})

// Ruta para registrar
app.get('/signup', (req, res) => {
  res.sendFile('signup.html', { root: 'public'})
})

app.post('/signup', (req, res) => {
  const { name, email, password, number, tac } = req.body
  
  // validaciones
  if (name.length < 3){
    res.json({ 'alert': 'name must be 3 letters long'})
  } else if (!email.length) {
    res.json({ 'alert': 'enter your email'})
  } else if (password.length < 8) {
    res.json({ 'alert': 'password must be 8 letters long'})
  } else if (!Number(number) || number.length < 10) {
    res.json({ 'alert': 'invalid number, please enter valid one'})
  } else if (!tac) {
    res.json({ 'alert': 'you must agree to our terms'})
  } else {
    // Almacenar datos en DB
    const users = collection(db, "users")
    getDoc(doc(users, email)).then(user => {
      if(user.exists()){
        res.json({ 'alert': 'email already exists'})
      } else {
        // encriptar password
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hash) => {
            req.body.password = hash
            req.body.seller = false
          setDoc(doc(users, email), req.body).then(data =>{
              res.json({
                name: req.body.name,
                email: req.body.email,
                seller: req.body.seller
              })
            })
          })
        })
      }
    })
  }
})

// Ruta login
app.get('/login', (req, res) => {
  res.sendFile('login.html', { root: 'public'})
})

app.post('/login', (req, res) => {
  let { email, password } = req.body

  if( !email.length || !password.length){
    return res.json({
      'alert': 'fill all the inputs'
    })
  }
  const users = collection(db, 'users')
  getDoc(doc(users, email))
    .then( user => {
      if(!user.exists()){
        return res.json({
          'alert': 'email doesnt exists'
        })
      } else {
        bcrypt.compare(password, user.data().password, (err, result) => {
          if(result){
            let data = user.data()
            return res.json({
              name: data.name,
              email: data.email,
              seller: data.seller
            })
          } else {
            return res.json({'alert': 'password incorrect'})
          }
        })
      }
    })
})

//Ruta seller
app.get('/seller', (req, res) => {
  res.sendFile('seller.html', { root: 'public'})
})

app.post('/seller', (req, res) => {
  let {name, address, about, number, email} = req.body

  if(!name.lenght || !address.lenght || !about.lenght || number.lenght < 10 || Number(number)){
    return res.json({
      'alert': 'something was wrong'
    })
  } else {
    //Update seller
    const sellers = collection(db, "sellers")
    setDoc(doc(sellers, email), req.body)
      .then(data => {
        const users = collection(db, "users")
        updateDoc(doc(users, email), {
          seller: true
        })
        .then( data => {
          res.JSON({
            'seller': true
          })
        })
      })
  }
})

app.get('/dashboard', (req, res) => {
  res.sendFile('dashboard.html', { root: 'public'})
})

app.post('/get-products', (req, res) => {
  let {email, id, tag} = req.body
  let products = collection(db, 'products')
  let docRef

  if(id){
    docRef = getDoc(doc(products, id))
  }else if(tag){
    docRef = getDocs(query(products, where("tags", "array-contains"),tag))
  } else {
    docRef = getDocs(query(products, where("email", "==", email)))
  }

  docRef.then( products =>{
    if(products.empty){
      return res.json('no products')
    }
    let arr = []
    if(id){
      return res.json(products.data())
    }else{
      products.forEach( item => {
        let data = item.data()
        data.id = item.id
        arr.push(data)
      })
    }
    res.json(arr)
  })
})

app.listen(3000, () => {
	console.log('Servidor en Ejecución...')
})
