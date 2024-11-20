import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import RenderHTML from "react-native-render-html"


/*
     Mostra o bloco de conhecimento 
 */

const ComponenteBloco = ({ idBloco, autorBloco, tituloBloco, textoBloco, sendoEditado }) => {  
  const [novoTextoBloco, setNovoTextoBloco] = useState(textoBloco)
  console.log("MostradorDeBlocos.js: " + textoBloco)
  return (

      <View style={styles.bloco}>
          <RenderHTML
          tagsStyles={{
            div: { fontSize: 14 }, // Define o tamanho da fonte para <p> como 20
            span: { fontSize: 14 },
            b: { fontSize: 14 },
            i: { fontSize: 14 },
            u: { fontSize: 14}
          }} 
          source={{ html: textoBloco }} // O conteúdo HTML que você deseja renderizar
          />
      </View>
    );
  };

  const styles = StyleSheet.create({
    bloco: {
      
      borderWidth: 1,
      borderColor: "#ddd",
      width: "100%",
      height: "auto",
      marginLeft: 0,
      padding: 10,
      justifyContent: "left",
      alignItems: "left",
      alignContent: "left",
    },

  });

export default ComponenteBloco

