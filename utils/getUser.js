import { db } from "../config/firestorage.js"; 
import { doc, getDoc } from "firebase/firestore"; 

// Função para retornar os dados de um usuário da coleção "Usuários"
export default async function getUser(uid) {
  try {
    // Cria uma referência ao documento
    const userDocRef = doc(db, "Usuários", uid);
    
    // Busca o documento
    const userDocSnap = await getDoc(userDocRef);

    // Verifica se o documento existe
    if (userDocSnap.exists()) {
      console.log("Dados do usuário:", userDocSnap.data());
      return userDocSnap.data(); // Retorna os dados do usuário
    } else {
      console.log("Nenhum usuário encontrado com esse ID.");
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar o usuário:", error);
    throw error;
  }
}
