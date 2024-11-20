import { db } from "../config/firestorage.js"; 
import { collection, addDoc } from "firebase/firestore"; 

// Função para adicionar um novo bloco à coleção "Blocos"
export default async function setBloco(titulo, texto, nomeDoUsuario, setor) {
  try {
    const docRef = await addDoc(collection(db, "Blocos"), {
        Título_do_Bloco: titulo,
        Corpo_do_Texto: texto,
        Autor: nomeDoUsuario,
        setor: setor, 
    });
    console.log("Documento adicionado com ID: ", docRef.id);
  } catch (error) {
    console.error("Erro ao adicionar documento: ", error);
  }
}
