import React, { useState } from "react";
import { Text, Platform, KeyboardAvoidingView, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";


/*
    Mostra o editor de texto puro
*/


const handleHead = ({ tintColor }) => <Text style={{ color: tintColor }}>H1</Text>;

const EditorTexto = ({ onChangeText, textoInicial }) => {  // Desestruturando onChangeText
  const richText = React.useRef();
  const [editorHeight, setEditorHeight] = useState(100); // Altura inicial do editor
  console.log("editorTexto.js - texto: "+ textoInicial )
  return (
    <SafeAreaView style={styles.editor}>
      <ScrollView style={styles.alturaAuto}>
        <KeyboardAvoidingView  behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, height: "auto" }}>
          <RichEditor
            placeholder="Digite o Conteúdo do bloco aqui!"
            ref={richText}
            onChange={(descriptionText) => {
              // Atualiza o estado do texto e chama a função de callback
              onChangeText(descriptionText); // Chama a função passada pelo pai
              //console.log("descriptionText:", descriptionText);
            }}
            onHeightChange={(height) => {
              setEditorHeight(height); // Atualiza a altura conforme o conteúdo
            }}
            style={{ height: editorHeight }} // Aplica a altura dinâmica
            initialContentHTML={textoInicial}
            editorStyle={{
              contentCSSText: "font-size: 14px;", // Define o tamanho da fonte do conteúdo
            }}
          />
        </KeyboardAvoidingView>
      </ScrollView>

      <RichToolbar
        editor={richText}
        actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.heading1, actions.insertBulletsList, actions.insertOrderedList]}
        iconMap={{ [actions.heading1]: handleHead }}
      />
    </SafeAreaView>
  );
};

export default EditorTexto;

const styles = StyleSheet.create({
  alturaAuto:{
      height:"auto"
  },
  editor:{
    borderWidth:1,
    borderColor: "#ddd",
    fontSize: 50
  }
});