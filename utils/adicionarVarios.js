import setBloco from "./setBloco"

// Função para adicionar vários blocos simultaneamente

const dados = [
// Recebe dados JSON na estrutura: 
/*
  {
    Titulo_do_Bloco: "String do título",
    Corpo_do_Texto: "String do corpo do texto.",
    Autor: "Stringo do autor"
     setor: "String do Setor"
  },
  {
    Titulo_do_Bloco: "String do título",
    Corpo_do_Texto: "String do corpo do texto.",
    Autor: "Stringo do autor",
    setor: "String do Setor"
  },
  ...
*/

]

// Função para adicionar os dados ao Firestore
const adicionarDadosAoFirestore = async () => {
  
  try {
    for (const dado of dados) {
        await setBloco(dado.Titulo_do_Bloco, dado.Corpo_do_Texto, dado.Autor, dado.setor);
        console.log(`Bloco "${dado.Titulo_do_Bloco}" adicionado com sucesso!`);
    
    }
    console.log("Todos os dados foram adicionados com sucesso!");
  } catch (erro) {
    console.error("Erro ao adicionar dados:", erro);
  }
};

// Chame a função (pode ser dentro de um efeito ou evento no React Native)
export default adicionarDadosAoFirestore;
