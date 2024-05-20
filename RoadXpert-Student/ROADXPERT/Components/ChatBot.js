import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  Image,
} from "react-native";
import BackNavigation from "../Components/BottomNavigation/BackNavigation";
import chatBotImg from "../assets/images/Dashboard/chatBot.jpg";

const ChatBot = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([
        ...messages,
        { text: message, isUser: true },
        { text: "Has visto los carteles? \n Los que dicen que me la peles", isUser: false },
        { text: "Vaya pavu caus per tot", isUser: false },
      ]);
      setMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <BackNavigation />
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>ChatBot</Text>
          <Image source={chatBotImg} style={styles.chatBotImage} />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>New Chat</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.isUser ? styles.userMessage : styles.botMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje"
          value={message}
          onChangeText={setMessage}
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    marginBottom: 10,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chatBotImage: {
    width: 32,
    height: 32,
    marginRight: 8,
  },
  headerText: {
    fontSize: 25,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 50,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  chatContainer: {
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  messageContainer: {
    marginVertical: 3,
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
  },
  userMessage: {
    backgroundColor: "grey",
    alignSelf: "flex-end",
  },
  botMessage: {
    backgroundColor: "lightblue",
    alignSelf: "flex-start",
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 12,
  },
  sendButton: {
    backgroundColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "white",
    fontSize: 16,
  },
});

export default ChatBot;
