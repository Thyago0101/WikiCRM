import { db } from "../config/firestorage.js"; 
import { collection, addDoc } from "firebase/firestore"; 

// Função para adicionar um novo usuário à coleção "Usuários"
export default async function setUser(uid, nome, email) {
  try {
    const docRef = await addDoc(collection(db, "Usuários"), {
        uid: uid,
        nome: nome,
        email: email, 
    });
    console.log("Usuário adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("setUser.js: Erro ao adicionar o usuário: ", error);
  }
}
