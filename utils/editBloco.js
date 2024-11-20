import { db } from "../config/firestorage.js"; // Importa a configuração do Firebase
import { doc, updateDoc } from "firebase/firestore"; 

// Função para editar o bloco
 export default async function editBloco(id, titulo, texto) {
    const novosDados={
        Título_do_Bloco: titulo,
        Corpo_do_Texto: texto,
        Autor: "Thyago", 
    }
    const blocoRef = doc(db, "Blocos", id);

    try {
        await updateDoc(blocoRef, novosDados); // Atualiza o documento com os novos dados
        console.log("Documento atualizado com sucesso!");

    } catch (error) {

      console.error("Erro ao editar documentos: ", error);
    }
  }

  