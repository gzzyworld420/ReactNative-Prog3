// el archivo config.js en la carpeta firebase contiene la configuracion de Firebase para mi app

// importamos el modulo app del paquete de firebase
// app proporciona la funcionalidad principal  de firebase, inicializacion y acceso a servidores 
import app from 'firebase/app';

// importamos el modulo firebase del paquete de firebase
// contiene la coleccion de utilizades y servicios adicionales proporcionados por firebase 
import firebase from 'firebase';

// Your web app's Firebase configuration
// creamos una constante firebaseConfig, que es un objeto que contiene la configuracion necesaria 
// generamos la constante para almacenar la configuracion 
const firebaseConfig = {
    // apikey es una clave unica que identifica tu proyecto en firebase 
    // apikey se utiliza para autenticar las solicitudes realizadas desde mi app hacia los servidores de firebase 
    // authdomain es el dominio autorizado para autenticar usuarios en mi app 
    // projectId es el identificador unico de mi proyecot en firebase
    // storagebucket es el almacenamiento de firebase donde se guardan los archivos 
    // messagingsenderId es el ID del remitente de mensajeria para enviar notificaciones push 
    // appId es el ID de la aplicacion generado en mi poryecto de firebase 
    apiKey: "AIzaSyCt4WVNALgW42E5F4ON4ckeUdFDoJJ06D4",
    authDomain: "proyecto-integrador-d0a35.firebaseapp.com",
    projectId: "proyecto-integrador-d0a35",
    storageBucket: "proyecto-integrador-d0a35.appspot.com",
    messagingSenderId: "995019175844",
    appId: "1:995019175844:web:c41f01ad30a88f8d83b331"
};

// lo siguiente es una llamada al metodo initializeApp() de firebase
// esta funcion se utiliza para inicializar la conexion entre mi app de RN y los servidores de firebase 
// usamos la configuracion proporcionada en firebaseConfig 
// al llamar a initializeapp se establece conexion con firebase y se configuran los servicios necesarios 
app.initializeApp(firebaseConfig);

// ACA TENGO MAS EXPORTS QUE CUANDO USO EXPORT DEFAULT 
// en estas lineas de codigo se estan exportando tres constantes que proporcionan el acceso a los servidores 
// auth refiere al servicio de autenticacion, permite inicios de sesion, registros, etc
// storage refiere al almacenamiento de firebase, permite almacenar y recuperar archivos, imagenes, etc 
// db se refiere a la instancia de firestore de firebase, permite almacenar y sincronizar datos con la nube 
export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();