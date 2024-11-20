import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, TextInput, Platform } from "react-native";

const Colapsavel = ({ titulo: tituloPassado, children, sendoEditado, onTituloChange, visivelPorPadrao = false }) => {
  const [visivel, setVisivel] = useState(visivelPorPadrao);
  const [titulo, setTitulo] = useState(tituloPassado);
  const alturaAnimada = useRef(new Animated.Value(0)).current;
  const [alturaCalculada, setAlturaCalculada] = useState(1);

  // Define a duração: 0 para Android/iOS, 300 para Web
  const animationDuration = Platform.OS === "web" ? 300 : 0;

  useEffect(() => {
    if (visivelPorPadrao && alturaCalculada !== null) {
      Animated.timing(alturaAnimada, {
        toValue: alturaCalculada,
        duration: 0,
        useNativeDriver: false,
      }).start();
    }
  }, [visivelPorPadrao, alturaCalculada]);

  const alternarVisibilidade = () => {
    if (visivel) {
      Animated.timing(alturaAnimada, {
        toValue: 0,
        duration: animationDuration,
        useNativeDriver: false,
      }).start(() => setVisivel(false));
    } else {
      setVisivel(true);
      Animated.timing(alturaAnimada, {
        toValue: alturaCalculada || 300,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleContentLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    if (height !== alturaCalculada) {
      setAlturaCalculada(height);
    }
  };

  useEffect(() => {
    if (alturaCalculada !== null && visivel) {
      Animated.timing(alturaAnimada, {
        toValue: alturaCalculada,
        duration: animationDuration,
        useNativeDriver: false,
      }).start();
    }
  }, [alturaCalculada, visivel]);

  return (
    <View style={styles.containerPrincipal}>
      <View style={styles.cabecalhoContainer}>
        <TouchableOpacity onPress={alternarVisibilidade} style={styles.containerTituloAcordion}>
          {sendoEditado ? (
            <TextInput
              style={styles.tituloInput}
              value={titulo}
              onChangeText={(novoTitulo) => {
                setTitulo(novoTitulo);
                onTituloChange(novoTitulo);
              }}
            />
          ) : (
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.textoTituloEstaticoAcordion}>{tituloPassado}</Text>
          )}
        </TouchableOpacity>
      </View>

      {visivel && (
        <Animated.View style={[styles.conteudo, { height: alturaAnimada }]}>
          <View style={styles.conteudoWrapper} onLayout={handleContentLayout}>
            {children}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerPrincipal: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    height: "auto",
  },
  containerTituloAcordion: {
    padding: 10,
    marginRight: 10,
    backgroundColor: "#f1f1f1",
    height: "auto",
    width: "100%",
  },
  textoTituloEstaticoAcordion: {
    fontSize: 16,
    fontWeight: "bold",
    height: "auto",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    overflow: "hidden",
    width: "auto",
  },
  tituloInput: {
    fontSize: 16,
    fontWeight: "bold",
    width: "auto",
    height: "auto",
    marginHorizontal: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  conteudo: {
    overflow: "hidden",
    backgroundColor: '#fff',
  },
  conteudoWrapper: {
    padding: 10,
  },
});

export default Colapsavel;
