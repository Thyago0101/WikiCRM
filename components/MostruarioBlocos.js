import React from "react";
import ComponenteBloco from "./bloco/index.js"; 
import { View, Text } from "react-native-web";

// Componente que renderiza a lista de blocos
export default function BlocosLista({ blocos, setBlocos, setorPassado }) {

    return(
        <>
    
    {blocos.map((bloco) => {

          return (
              <ComponenteBloco
                key={bloco.id}
                tituloBloco={bloco.Título_do_Bloco}
                idBloco={bloco.id}
                textoBloco={bloco.Corpo_do_Texto}
                autorBloco={bloco.Autor}
                style={{ height: "auto"}}
                setBlocos={setBlocos}
                setorPassado={setorPassado}
              />
          )
        })}
        
        </>)
        
    }
