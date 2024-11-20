// Bibliotecas
import React, {useEffect, useState} from "react"
import { StyleSheet, Text, View, ScrollView, Button, TextInput} from "react-native";

// Componentes
import MostruarioBlocos from "../../components/MostruarioBlocos.js"
import HeaderSetores from "../../components/headerSetores.js";

// Funções, utilidades e contextos
import getBlocos from "../../utils/getBlocos.js"
import { useUser, UserProvider } from "../../UserContext.js";

export default function HomeSepro({navigation, route}) {

  const {nomeDoUsuario, setNomeDoUsuario} = useUser();
  const [blocos, setBlocos] = useState([]); // Estado par a armazenar os textos dos blocos consultados no BD Firebase
  const { user } = route.params;
  console.log("HomeSetores.js - UserName: " + nomeDoUsuario)

  // Adiciona os blocos ao carregar o programa
  useEffect(()=>{consultaBlocosBD()},[])

  // Consulta os blocos do BD e atribui à variável blocos
   consultaBlocosBD = async () => {
    
      const consultaBlocos = await getBlocos()
      const blocosFiltrados = consultaBlocos.filter(bloco => bloco.setor === "sepro")
      setBlocos(blocosFiltrados)
  };

  return (
    // Tela principal do app
    <>
    <HeaderSetores 
        setBlocos={setBlocos}  
        navigation={navigation}
        setorPassado="sepro"
    />
    <ScrollView style={styles.container}>
      {/*Componente principal do programa que desmembra o array blocos para exibir os blocos separadamente*/}
      <MostruarioBlocos blocos={blocos} setBlocos={setBlocos} setorPassado="sepro"/>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    flex: 1,
    backgroundColor: "white",
    height: "auto",
 
  },
});


