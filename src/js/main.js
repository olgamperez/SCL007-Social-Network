import {checkAuthState, registerUser, gmailLogIn, signOut, loginUserWithEmail, facebookLogIn} from '../js/auth.js';
import { savePost, readPost } from '../js/data.js';
window.onload = () =>{     
     checkAuthState((user) => {
        if(user){
            document.getElementById('loginRegister').style.display ="none";
            document.getElementById('app').style.display = "block";
            savePostFromDatabase();
            document.getElementById('btnLogout').style.display = "block";
            
        }else{
            document.getElementById('loginRegister').style.display ="block";
            document.getElementById('app').style.display = "none";
            document.getElementById('btnLogout').style.display = "none";
        }
    });
}
//Registrar usuario (email y contraseña)
const registerWithEmailAndPassword =()=>{
    const emailUser = textEmail.value;
    const passwordUser = password.value;
    registerUser(emailUser, passwordUser); 
};
document.getElementById('btnSignUp').addEventListener('click', registerWithEmailAndPassword);

//Iniciar Sesión correo y contraseña
const signInWithEmailAndPassword = ()=>{
    const emailUser = textEmail.value;
    const passwordUser = password.value;
    loginUserWithEmail(emailUser, passwordUser);  
};
document.getElementById('btnLogin').addEventListener('click', signInWithEmailAndPassword);

//Iniciar sesión con Google
const logInGoogle =()=>{
  //alert("hola")
  gmailLogIn()
}
document.getElementById('btnGmail').addEventListener('click', logInGoogle);
//Cerrar sesión
const logOut =() =>{
 //console.log("Ud cerro sesión")
  signOut()
}
document.getElementById('btnLogout').addEventListener('click', logOut);

//Iniciar sesión con Facebook
const logInFacebook = () => {
    
    facebookLogIn()
}
document.getElementById('btnFacebook').addEventListener('click', logInFacebook); 
const savePostIntoDatabase = () => {
    const userName = firebase.auth().currentUser.displayName;
    const post = document.getElementById('postContent').value;
    const photo = firebase.auth().currentUser.photoURL;
    savePost(userName, post, photo);
}
//Guardar la información de los post en un arreglo, aplicarle revese y luego imprimirla
 const savePostFromDatabase = () => {
     readPost((post)=>{
         
    postPublished.innerHTML =
    `<div class="container">
    <div class="row">
    <div class="col-3">
    <p>${post.val().user}</p>
    <img src="${post.val().userphoto}" alt="imagen usuario">
    </div>
    <div class="col-9">                 
    <div class="row">
    <p class="col-12">${post.val().pospublic}</p>
    <div class="col-3"><i class="far fa-heart"></i> Me gusta</div>
    <div class="col-3"><i class="far fa-bookmark"></i> Guardar</div>
    <div class="col-3"><i class="far fa-comment-dots"></i> Comentarios</div>
    <div class="col-3"><i class="fas fa-exclamation"></i> Reportar</div>
    <div class="col-12">
    <button>Ver respuesta</button>
    </div>
    </div>
    </div>
    
    </div>
    </div>`  + postPublished.innerHTML;
    });
    }
    document.getElementById('public').addEventListener('click', savePostIntoDatabase);
     
    const readPostFromDatabase = () => {
    root.style.display="block"
    readPost((coment)=>{            
        newcoments.innerHTML  += 
      `<div id= ${coment.key}>
      <h3>${coment.val().title}</h3>
       <p>${coment.val().body}</p>
       <button id=" ${coment.key}">borrar</button>
       </div>
       `;  document.getElementById(coment.key).addEventListener('click', deletePost)
    });     
  }
// Eliminar post




//Recuperacion de contraseña
document.getElementById("forgotPassword").addEventListener("click",() => {
    let emailUser = document.getElementById("textEmail").value;
     firebase.auth().sendPasswordResetEmail(emailUser)
 .then(function() {
     document.getElementById('warning').innerHTML = "Revisa tu email para cambiar tu contraseña"
 }).catch(error => {
     document.getElementById('warning').innerHTML = "Ingrese su email"
 });
 })

 /*
 Probando tareas de autentificación
//Enviar correo para verificación 
checkEmail = ()=>{
    firebase.auth().currentUser.sendEmailVerification()
    .then(function(){
        document.getElementById('registro-text').innerHTML = "Confirma tu cuenta desde tu Email"
    })
    .catch(error =>{
        document.getElementById('registro-text').innerHTML = "Ingrese su email"
    })
};*/



