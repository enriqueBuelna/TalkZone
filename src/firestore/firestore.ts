// storage.ts
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage'; // Importar funciones necesarias

// Definir el tipo para la configuración de Firebase
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string; // measurementId es opcional
}


const firebaseConfig = {
  apiKey: 'AIzaSyCK7zVWPLge96q_bkh1gvPJJNqeCnqslfE',
  authDomain: 'carrito-compras-1367a.firebaseapp.com',
  projectId: 'carrito-compras-1367a',
  storageBucket: 'carrito-compras-1367a.appspot.com',
  messagingSenderId: '1094106728627',
  appId: '1:1094106728627:web:9855e103bb9b178c2648c6',
};
// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Inicializar Storage
const storage = getStorage(app);

// Función para subir archivos a Firebase Storage
export const uploadFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Crear una referencia a la ubicación en Storage
    const storageRef = ref(storage, `posts/${file.name}`);

    // Subir el archivo
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Escuchar los cambios de estado de la carga
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        reject(error); // Manejar el error en caso de falla
      },
      () => {
        // Obtener la URL de descarga cuando la carga esté completa
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL); // Resolver con la URL de descarga
        });
      }
    );
  });
};
