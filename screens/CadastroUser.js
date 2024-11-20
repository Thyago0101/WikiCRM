import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, Image } from "react-native";
import { auth, db } from "../config/firestorage"; // Importe o Firebase Auth
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import setUser from "../utils/setUser";
import { FontAwesome } from "@expo/vector-icons";

// thyagocpp@gmail.com - senha123

export default function CadastroScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nomeDoUsuario, setNomeDoUsuario] = useState("");

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [msgErro, setmsgErro] = useState("");

  const handleCadastro = async () => {
    try {
        // Cria o usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        console.log("Usuário Criado com Uid: " + user.uid);
        Alert.alert("Cadastro realizado com sucesso!", "Por gentileza, realize o login.");
        
        // Cadastra o usuário também no FireStorage
        await setDoc(doc(db, "Usuários", user.uid), {
          nome: nomeDoUsuario,
          email: email,
          interno: false
        });

        navigation.navigate("Login");
        
    } catch (error) {
        setmsgErro("Preencha todos os campos corretamente!");
        console.error("Erro ao logar:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
      <Image source={require("../assets/wikicrm.png")} style={styles.image} />

        
      <View style={styles.inputContainer}>
            <View style={styles.iconeInput}>
                <FontAwesome name="user" size={20} color="grey" />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Seu Nome"
                value={nomeDoUsuario}
                onChangeText={(text) => setNomeDoUsuario(text)}
            />
        </View>

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
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={{ color: "#129FF8", marginTop: 10, fontSize:12, alignSelf: "left" }}>Já tem conta? Entre por aqui.</Text>
        </TouchableOpacity>
        <View style={styles.containerMsgErro}>
            <Text style={{color:"red", alignSelf: "left", fontSize: 12}}>{msgErro}</Text>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleCadastro}>
          <Text style={styles.loginButtonText}>Cadastrar</Text>
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
