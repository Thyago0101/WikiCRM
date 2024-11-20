import { StyleSheet, Text, View, StatusBar, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";


export default function HeaderCadastroBloco({ navigation }) {

    const handleClose =  () => {
        navigation.navigate("Home")
        }

    return (
        <View style={styles.header}>
            <StatusBar barStyle="default" backgroundColor={"#008000"} /> 
            <Text style={styles.headerText}>
                WikiCRM
            </Text>
            <View style={styles.headerAcoes}>
                <TouchableOpacity onPress={handleClose}>
                    <FontAwesome name="close" color="white" size={30} />
                </TouchableOpacity>
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
    }
});
