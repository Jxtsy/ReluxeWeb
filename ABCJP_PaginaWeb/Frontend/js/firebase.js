import { getFirestore, addDoc, getDocs, collection, query, where, orderBy, limit, getDoc, doc, setDoc} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { initializeApp} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js';

  const firebaseConfig = {
    apiKey: "AIzaSyABuNxbab6dvlA1MBkwFLc1DsGtkNe5lBk",
    authDomain: "abcjp-paginaweb.firebaseapp.com",
    projectId: "abcjp-paginaweb",
    storageBucket: "abcjp-paginaweb.appspot.com",
    messagingSenderId: "821483200512",
    appId: "1:821483200512:web:16eac8518fb639058cf8e5"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth(app);
  const user = auth.currentUser;

  export const saveUser = async (nameP, lastName, email, birthday, country, password, phone) =>
    await addDoc(collection(db, "Usuario"), {nameP, lastName, email, birthday, country, password, phone});

  export const createUser = async (email, password) => 
    await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      window.location.href = 'login.html';
    })
    .catch((error) => {
        window.alert('El correo ya se encuentra registrado.');
        const errorMessage = error.message;
        console.log(errorMessage);})
        
  export const signInUser = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        window.localStorage.setItem('Token',userCredential.user.accessToken);
        window.location.href = 'profile.html';
        console.log("Sesión iniciada correctamente.");
      })
      .catch((error => {
        const errorMessage = error.message;
        console.log(errorMessage);
        switch(errorMessage)
        {
            case 'Firebase: Error (auth/wrong-password).':
              window.alert("Correo o contraseña incorrectos");
              break;
            case 'Firebase: Error (auth/user-not-found).':
              window.alert("No estás registrado.");
              window.location.href = 'register.html';
              break;
        }
      }))}

  export const saveProfile = async ( neckName, categoria, compra, estilo) => {
    await addDoc(collection(db, "Perfil"), { neckName, categoria, compra, estilo })};

  export const getProducts = (genero, orden, limite) => getDocs(query(collection(db, "Producto"), where("genero", "==", genero), orderBy("existencia", orden), limit(limite)));

  export const getProductCategoria = (categoria,genero) => getDocs(query(collection(db, "Producto"), where("categoria", "==", categoria),where("genero", "==", genero)));

  export const getProductsIndex = (carrusel) => getDocs(query(collection(db, "Index"), where("carrusel", "==", carrusel)));

  export const getProduct = (ref) => getDoc(doc(db, "Producto", ref));

  export const addFavorite = async (nombre, img, precio , ref, estatus, fechaAgregado) => 
    await addDoc(collection(db, "Favorito"), {nombre, img, precio, ref, estatus, fechaAgregado});

  export const getIndexRef = (ref) => getDoc(doc(db, "Index", ref));

  export const messageContact = async (email, message) => 
    await addDoc(collection(db, "Contacto"), {email, message});

  export const getFavorites = () => getDocs(query(collection(db, "Favorito"), where("estatus", "==", true), orderBy("fechaAgregado", "desc")));

  export const deleteFavorite = async (ref) => 
    await setDoc(doc(db, "Favorito", ref), {estatus: false});
    