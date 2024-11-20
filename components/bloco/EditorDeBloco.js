import React, { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import EditorTexto from "../../utils/editorTexto"; // Importando o componente EditorTexto
import editBloco from "../../utils/editBloco";


/*
        Mostra toda a UI para edição de blocos
*/

const EditorDeBloco = ({idBloco, tituloBloco, textoInicial, onChangeTextEditor}) => {
    const [tituloNovoBloco, setTiuloNovoBloco] = useState(tituloBloco);
    const [textoNovoBloco, setTextoNovoBloco] = useState(null);

    console.log("EditorDeBloco.js - texto: " + textoInicial)

    // Função para atualizar o texto do editor
    const handleTextChange = (textoDoEditor) => {
        setTextoNovoBloco(textoDoEditor); // Atualiza o estado com o novo texto
        console.log("EditorDeBloco.js - handleTextChange: Texto do editor: " + textoDoEditor); // Log do texto atualizado
    };

    return (
        <View style={styles.alturaAuto}>

            <EditorTexto
                onChangeText={(textoDoEditor)=>{handleTextChange; onChangeTextEditor(textoDoEditor)}} // Passa a função de callback
                textoInicial={textoInicial}
            />

        </View>
    );
};

export default EditorDeBloco;

const styles = StyleSheet.create({
    tituloNovoBloco: {
        height: "auto",
    },
});
