// Bibliotecas
import { StyleSheet, Text, View, TouchableOpacity, Switch, Alert } from "react-native";
import { useState } from "react";

//Componentes
import Colapsavel from "./Colapsavel.js";
import EditorDeBloco from "./EditorDeBloco.js"
import MostradorDeBloco from "./MostradorDeBloco.js"

// Funções, utilidades e contextos
import editBloco from "../../utils/editBloco";
import getBlocos from "../../utils/getBlocos.js";
import { useUser } from "../../UserContext.js";

/*
     Mostra o bloco de conhecimento 
 */

     const ComponenteBloco = ({ idBloco, autorBloco, tituloBloco, textoBloco, setBlocos, setorPassado }) => { 
        const [novoTextoBloco, setNovoTextoBloco] = useState(textoBloco);
        const [novoTituloBloco, setNovoTituloBloco] = useState(tituloBloco);
        const [sendoEditado, setSendoEditado] = useState(false);
        const {interno} = useUser()
    
        const toggleSwitch = () => setSendoEditado(previousState => !previousState);
    
        // Função para atualizar o título do bloco
        const handleTituloChange = (novoTitulo) => {
            setNovoTituloBloco(novoTitulo); // Atualiza o estado com o novo título
            console.log("index.js: titulo: " + novoTitulo)
        };
        
        const handleTextoEditorChange = (novoTextoEditor)=>{
            setNovoTextoBloco(novoTextoEditor)
        }

        const handleRefresh = async () => {
            setBlocos([])
            const consultaBlocos = await getBlocos()
            const blocosFiltrados = consultaBlocos.filter(bloco => bloco.setor === setorPassado)
            setBlocos(blocosFiltrados)
        };


        const sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms));
          }

          return (
            <View style={styles.bloco}>
                <Colapsavel 
                    style={styles.tituloBloco} 
                    titulo={novoTituloBloco} 
                    id={idBloco} 
                    sendoEditado={sendoEditado} 
                    onTituloChange={handleTituloChange} 
                >
                    <>
                    {sendoEditado ? (
                        <EditorDeBloco idBloco={idBloco} tituloBloco={tituloBloco} textoInicial={textoBloco} onChangeTextEditor={handleTextoEditorChange} />
                    ) : (
                        <MostradorDeBloco textoBloco={textoBloco} />
                    )}
    
                    {/* Mostrar o containerRodaPe apenas se interno for true */}
                    {interno && (
                        <View style={styles.containerRodaPe}>
                            <TouchableOpacity 
                                style={[
                                    styles.botaoEditar, 
                                    { backgroundColor: sendoEditado ? "#129FF8" : "#dbd9d9" }
                                ]}  
                                onPress={async () => {
                                    editBloco(idBloco, novoTituloBloco, novoTextoBloco);
                                    console.log("index.js: Título do bloco: " + novoTituloBloco);
                                    console.log("index.js: Id do bloco: " + idBloco);
                                    await sleep(1000);
                                    Alert.alert(
                                        "Sucesso!", 
                                        "Bloco editado com sucesso", 
                                        [{ text: "OK", onPress: () => console.log("Alerta fechado") }]
                                    );
                                    handleRefresh();
                                }}
                            >
                                <Text style={styles.textoBotaoEditar}>SALVAR</Text>
                            </TouchableOpacity>
                            <View style={styles.containerSwitch}>
                                <Text style={{marginLeft: 10}}>Ativar Edição</Text>
                                <Switch
                                    trackColor={{ false: "#767577", true: "#129FF8" }}
                                    thumbColor={sendoEditado ? "#f4f3f4" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={sendoEditado}
                                    style={{ marginLeft: 10, marginRight: 10 }}
                                />
                            </View>
                        </View>
                    )}
                    </>
                </Colapsavel>
            </View>
        );
    };


  const styles = StyleSheet.create({
    bloco: {
      backgroundColor: "white",
      //borderWidth: 1,
      width: "100%",
      height: "auto",
      margin: 0,
      padding: 0,
      justifyContent: "left",
      alignItems: "left",
      alignContent: "left",

    },

    tituloBloco:{
      fontWeight: "bold",
      textAlign: "left",
      backgroundColor: "red"
      
    },

    botaoEditar:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginLeft: 10,
    },
    textoBotaoEditar:{
        color: "white",
        fontWeight: "bold"
    },
    containerRodaPe:{
        marginTop: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    containerSwitch:
    {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"        
    }
  });

export default ComponenteBloco

