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

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyDwkhwJW0W63BLCik72IRqAL9EOhIsmoko',
  authDomain: 'fir-df1ec.firebaseapp.com',
  projectId: 'fir-df1ec',
  storageBucket: 'fir-df1ec.appspot.com',
  messagingSenderId: '775054586512',
  appId: '1:775054586512:web:cf8bc09020c2f184a95e15',
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
