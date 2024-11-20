// Bibliotecas
import React, { useState } from "react";
import { StyleSheet, TextInput, View, Button, ScrollView, Text, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

// Componentes
import HeaderCadastroBloco from "../components/headerCadastroBloco.js";
import EditorTexto from "../utils/editorTexto.js";

// Funções, utilidades e contextos
import setBloco from "../utils/setBloco.js";
import getBlocos from "../utils/getBlocos.js";
import { useUser } from "../UserContext.js";

export default function CadastroBloco({ navigation, route }) {
  const {nomeDoUsuario, setNomeDoUsuario} = useUser();
  const [titulo, setTitulo] = useState("");
  const [texto, setTexto] = useState("");
  const { setBlocos } = route.params;
  const [setor, setSetor] = useState("")

  console.log("cadastroBloco.js: nome do usuário: " + nomeDoUsuario);

  const handleRecarregar = () => {
    setBlocos([]);
    consultaBlocosBD();
};
  const handleChangePicker = (value) => {
    setSetor(value);
};

const consultaBlocosBD = async () => {
    const consultaBlocos = await getBlocos();
    setBlocos(consultaBlocos);
};
  const handleTextChange = (textoDoEditor) => {
    setTexto(textoDoEditor); // Atualiza o estado com o novo texto
    console.log("CadastroBloco.js - handleTextChange: Texto do editor: " + textoDoEditor);
  };

  const handleSave = () => {
    // Lança mensagem de erro se um dos campos estiverem vazios
    if (!titulo.trim() || !texto.trim()) {
      Alert.alert("Atenção", "Por favor, preencha o título e o conteúdo do bloco.");
      return;
    }

    setBloco(titulo, texto, nomeDoUsuario, setor);
    Alert.alert("Sucesso!", `Seu bloco com o título "${titulo}" foi adicionado com sucesso!`);
    
    handleRecarregar()

    navigation.navigate("Home")
  };

  return (
    <>
      <HeaderCadastroBloco navigation={navigation} />
      <ScrollView style={styles.container}>
        <TextInput 
          style={styles.inputTitulo}
          value={titulo}
          onChangeText={setTitulo}
          placeholder="Digite o título do bloco."
        />
        <EditorTexto
          onChangeText={handleTextChange}
          textoInicial={texto}
          style={styles.editorTexto}
        />
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={setor}
          onValueChange={(itemValue) => handleChangePicker(itemValue)}
          mode="dropdown"
          style={styles.picker}
        >
          <Picker.Item label="Selecione o Setor" value="não informado" enabled={false}/>
          <Picker.Item label="Corregedoria" value="sepro" />
          <Picker.Item label="Registro de Pessoa Física" value="registroPF" />
          <Picker.Item label="Tesouraria" value="tesouraria" />
          <Picker.Item label="Registro de Pessoa Jurídica" value="registroPJ" />
        </Picker>
      </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Salvar"
            onPress={handleSave}
            color="#129FF8"
          />
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  inputTitulo: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    marginBottom: 15,
  },
  editorTexto: {
    width: "100%",
    height: 200,
    padding: 10,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 5,
    backgroundColor: "#007bff",
    width: 80,
    overflow: "hidden",
  },
  pickerContainer: {
    display: "flex",
    justifyContent: "center",
    marginVertical: 10,
    backgroundColor: "#f9f9f9",
    borderColor: "#ccc",
    borderWidth: 1,
    

  },
  picker: {

    height: 40,
    color: "#333",
  },
});
