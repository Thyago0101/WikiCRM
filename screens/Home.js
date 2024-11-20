// Bibliotecas
import React, {useEffect, useState} from "react"
import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from "react-native";

// Componentes
import MostruarioBlocos from "../components/MostruarioBlocos.js"
import HeaderHome from "../components/headerHome.js";
import Icon from "react-native-vector-icons/FontAwesome";

// Funções, utilidades e contextos
import getBlocos from "../utils/getBlocos.js"
import { useUser, UserProvider } from "../UserContext.js";
//import adicionarDadosAoFirestore from "../utils/adicionarVarios.js";

export default function Home({navigation, route}) {

  const {nomeDoUsuario, setNomeDoUsuario} = useUser();
  const [blocos, setBlocos] = useState([]); // Estado par a armazenar os textos dos blocos consultados no BD Firebase
  const { user } = route.params;
  console.log("Home.js - UserName: " + nomeDoUsuario)
  const cards = [
    { id: 1, title: "Corregedoria", icon: "balance-scale", screen: "HomeSepro", size: 30 },
    { id: 2, title: "Tesouraria", icon: "money", screen: "HomeTesouraria", size: 30  },
    { id: 3, title: "Registro Pessoa Física", icon: "user", screen: "HomePF", size: 32  },
    { id: 4, title: "Registro Pessoa Jurídica", icon: "building", screen: "HomePJ", size: 30  },
  ];
  // Adiciona os blocos ao carregar o programa
  useEffect(()=>{
    consultaBlocosBD()
    //adicionarDadosAoFirestore()
  },[])

  // Consulta os blocos do BD e atribui à variável blocos
   consultaBlocosBD = async () => {
      const consultaBlocos = await getBlocos()
      setBlocos(consultaBlocos)
  };

  return (
    // Tela principal do app
    <>
    <HeaderHome 
        setBlocos={setBlocos}  
        navigation={navigation}
    />
    <View style={styles.cardContainer}>
      {cards.map((card) => (
        <TouchableOpacity
          key={card.id}
          style={styles.cardStyle}
          onPress={() => navigation.navigate(card.screen)}
        >
          <View style={styles.containerIcon}>
            <Icon name={card.icon} size={card.size} color="#4A4A4A" style={styles.cardIcon} />
          </View>
          <Text style={styles.cardText}>{card.title}</Text>
        </TouchableOpacity>
      ))}
    </View>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    height: "auto",
 
  },
  cardContainer: {
    flex: 1,
    justifyContent: "flex-start", // vertical
    alignItems: "center", // horizontal
    backgroundColor: "#f9f9f9",
    paddingTop: 10,
  },
  cardStyle: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    marginVertical: 10,
    elevation: 3,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    width: "90%",
  },
  cardIcon: {
    marginRight: 0,
  },
  cardText: {
    fontSize: 18,
    color: "#333",
  },
  containerIcon: {
    display: "flex",
    justifyContent: "center", 
    alignItems: "center",
    //backgroundColor: "red",
    width: 50,
  }
});


