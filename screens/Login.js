import React, { useState } from "react";
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { auth } from "../config/firestorage.js"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import getUser from "../utils/getUser.js";
import { useUser } from "../UserContext.js";

 //thyagocpp@gmail.com - senha123

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const {nomeDoUsuario, setNomeDoUsuario} = useUser()
  const {interno, setInterno} = useUser()
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [msgErro, setmsgErro] = useState("");

  const handleLogin = async () => {
    try {
      // Faz login com o Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      const user = userCredential.user;
      console.log("Usuário logado, UID nº:", user.uid);
      
      // Consulta o usuário no BD para retornar nome e outros campos necessários que não são disponibilizados pelo FirebaseAuth
      const consultaUsuario = await getUser(user.uid)
      setNomeDoUsuario(consultaUsuario["nome"])
      setInterno(consultaUsuario["interno"])
     
      if (interno === true){
        console.log("Login.js: logando como usuário interno")
      } else{
        console.log("Login.js: logando como usuário externo")
      }

      navigation.navigate("Home", {user})


    } catch (error) {
        setmsgErro("Usuário ou senha inválidos")
        console.error("Erro ao logar:", error);
    }
  }


  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
      <Image source={require('../assets/wikicrm.png')} style={styles.image} />

        
        <View style={styles.inputContainer}>
            <View style={styles.iconeInput}>
                <FontAwesome name="envelope" size={20} color="grey" />
            </View>
            <TextInput
                style={styles.input}
                placeholder="exemplo@dominio.com"
                value={email}
                onChangeText={(text) => setEmail(text)}
            />
        </View>

        <View style={styles.inputContainer}>
            <View style={styles.iconeInput}>
                <FontAwesome name="lock" size={27} color="grey" />
            </View>
          <TextInput
            style={styles.input}
            placeholder="************"
            secureTextEntry={!mostrarSenha}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
          <TouchableOpacity onPress={() => setMostrarSenha(!mostrarSenha)}>
            <FontAwesome name={mostrarSenha ? "eye" : "eye-slash"} size={24} color="grey" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroUser')}>
          <Text style={{ color: "#129FF8", marginTop: 10, fontSize:12 }}>Ainda não tem uma conta? Cadastre-se aqui.</Text>
        </TouchableOpacity>
        <View style={styles.containerMsgErro}>
            <Text style={{color:"red", alignSelf: "left"}}>{msgErro}</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "EFEFEF",
  },
  loginContainer: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    elevation: 5, // para Android
    shadowColor: "#000", // para iOS
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: "100%",
  },
  iconeInput: {
    width: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  loginButton: {
    backgroundColor: "#008000",
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
  },
  containerMsgErro: {
    width: "100%",
    paddingHorizontal: 10,
  },
});

