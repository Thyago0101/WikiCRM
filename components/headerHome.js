import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import getBlocos from "../utils/getBlocos.js";
import { auth } from "../config/firestorage.js";
import { signOut } from "firebase/auth";
import { useUser } from "../UserContext.js";


export default function Header({ setBlocos, navigation, setorPassado}) {

    const {nomeDoUsuario, setNomeDoUsuario} = useUser();
    const {interno} = useUser();
    console.log("header.js: nome do usuário: " + nomeDoUsuario)



    const handleCriarBlocos = () => {
        navigation.replace("CadastroBloco", {setBlocos})
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            console.log('Usuário deslogado com sucesso');
            navigation.navigate("Login")

        } catch (error) {
            console.error('Erro ao deslogar:'+ error);
            alert('Erro ao realizar logout');
            navigation.goBack()
        }
    };

    return (
        <View style={styles.header}>
            <StatusBar barStyle="default" backgroundColor={"#008000"} /> 
            <Text style={styles.headerText}>
                WikiCRM
            </Text>
            <View style={styles.headerAcoes}>
                <TouchableOpacity onPress={handleLogout}>
                    <FontAwesome name="sign-out" color="white" size={28} />
                    <Text style={styles.textoIcones} >SAIR</Text>
                </TouchableOpacity>

                {interno && (
                <TouchableOpacity onPress={handleCriarBlocos}>
                    <FontAwesome name="plus" color="white" size={28} />
                    <Text style={styles.textoIcones}>CRIAR</Text>
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
        flexDirection: "row",
        gap: 15,
        marginRight: 20,
    },
    textoIcones: {
        fontSize: 8,
        color: "white",
    },
});
