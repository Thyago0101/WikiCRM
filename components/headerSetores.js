import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import getBlocos from "../utils/getBlocos.js";
import { auth } from "../config/firestorage.js";
import { signOut } from "firebase/auth";
import { useUser } from "../UserContext.js";


export default function headerSetores({ setBlocos, navigation, setorPassado}) {

    const {nomeDoUsuario, setNomeDoUsuario} = useUser();
    const {interno} = useUser();
    console.log("header.js: nome do usuário: " + nomeDoUsuario)

    const handleRecarregar = () => {
        setBlocos([]);
        
        consultaBlocosBD();
    };
    
    
    const consultaBlocosBD = async () => {
        const consultaBlocos = await getBlocos();

        const blocosFiltrados = consultaBlocos.filter(bloco => bloco.setor === setorPassado)

        setBlocos(blocosFiltrados)

    };

    const handleCriarBlocos = () => {
        navigation.replace("CadastroBloco", {setBlocos})
    };

    const handleVoltar = () => {
            navigation.navigate("Home")
    };

    return (
        <View style={styles.header}>
            <StatusBar barStyle="default" backgroundColor={"#008000"} /> 
            <Text style={styles.headerText}>
                WikiCRM
            </Text>
            <View style={styles.headerAcoes}>
                <TouchableOpacity style = {styles.containerIcones} onPress={handleVoltar}>
                    <FontAwesome name="arrow-left" color="white" size={28} />
                    <Text style={styles.textoIcones} >VOLTAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {styles.containerIcones} onPress={handleRecarregar}>
                    <FontAwesome name="refresh" color="white" size={26} />
                    <Text style={styles.textoIcones} >RELOAD</Text>
                </TouchableOpacity>
                {interno && (
                <TouchableOpacity style = {styles.containerIcones} onPress={handleCriarBlocos}>
                    <FontAwesome name="plus" color="white" size={28} />
                    <Text style={styles.textoIcones} >CRIAR</Text>
                </TouchableOpacity>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#008000',
        width: "100%",
        height: 50,
        margin: 0,
        padding: 0,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "white",
        marginLeft: 20,
    },
    headerAcoes: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        gap: 15,
        marginRight: 20,
    },
    textoIcones: {
        fontSize: 8,
        color: "white",
    },
    containerIcones: {
        display: "flex",
        alignItems: "center",    // Horizontal
        justifyContent: "center" // Vertical
    }
});
