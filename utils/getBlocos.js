import { db } from "../config/firestorage.js"; 
import { collection, addDoc, getDocs } from "firebase/firestore"; 

// Função para retornar todos os blocos da coleção "Blocos"
 export default async function getBlocos() {
    try {
      const querySnapshot = await getDocs(collection(db, "Blocos"));
      const blocos = []
      querySnapshot.forEach((doc) => {
        blocos.push({ id: doc.id, ...doc.data() })
    });
    return blocos
    } catch (error) {
      console.error("Erro ao buscar documentos: ", error);
        return []
    }
  }