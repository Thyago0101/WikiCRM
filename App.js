// Bibliotecas
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Telas
import LoginScreen from "./screens/Login";
import HomeScreen from "./screens/Home";
import CadastroBloco from "./screens/CadastroBloco";
import CadastroScreen from "./screens/CadastroUser";

import HomeSepro from "./screens/setores/HomeSepro";
import HomeTesouraria from "./screens/setores/HomeTesouraria";
import HomePF from "./screens/setores/HomePF";
import HomePJ from "./screens/setores/HomePJ";


// Funções e utilidades
import getBlocos from "./utils/getBlocos";
import { UserProvider } from "./UserContext";

// Definindo o stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  const [blocos, setBlocos] = useState([]); // Estado para armazenar os textos dos blocos consultados no BD Firebase
  const [isLogged, setIsLogged] = useState(false);

  // Função para consultar os blocos do BD e atribuir ao estado "blocos"
  const consultaBlocosBD = async () => {
    const consultaBlocos = await getBlocos();
    setBlocos(consultaBlocos);
  };

  // Adiciona os blocos ao carregar o programa
  useEffect(() => {
    consultaBlocosBD();
  }, []);

  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CadastroUser" 
          component={CadastroScreen}
          initialParams={{ setIsLogged }} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Home" 
          component={HomeScreen}
          initialParams={{ blocos }} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="CadastroBloco" 
          component={CadastroBloco}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeSepro" 
          component={HomeSepro}
          initialParams={{ blocos }} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomeTesouraria" 
          component={HomeTesouraria}
          initialParams={{ blocos }} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomePF" 
          component={HomePF}
          initialParams={{ blocos }} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="HomePJ" 
          component={HomePJ}
          initialParams={{ blocos }} 
          options={{ headerShown: false }}
        />            
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}


