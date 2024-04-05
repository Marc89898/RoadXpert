import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import OpenAI from 'openai';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { Audio } from 'expo-av';
import { Speech } from 'expo';





const openIAApiKey = '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'; // Reemplaza con tu clave de API de OpenAI
const openai = new OpenAI({ apiKey: openIAApiKey });

const App = () => {
  const [isLoading, setLoading] = useState(false);

  
const transcribeAudio = async () => {
  setLoading(true);
  try {
    const audio = Asset.fromModule(require('./data/whatstheweatherlike.mp3'));
    await audio.downloadAsync();
    const audioPath = `${FileSystem.documentDirectory}audio.mp3`;
    
    await FileSystem.moveAsync({
      from: audio.localUri,
      to: audioPath,
    });
    
    const { sound } = await Audio.Sound.createAsync(
      { uri: audioPath },
      { shouldPlay: false }
    );
    
    await sound.playAsync();

    const { transcription } = await Speech.toTextAsync(
      audioPath,
      { encoding: Speech.EncodingType.WAV }
    );

    console.log('Transcripción de audio:', transcription);
    const response = await openai.complete({
      engine: 'whisper',
      prompt: transcription,
      maxTokens: 100,
    });

    console.log('Respuesta de OpenAI:', response);



  } catch (error) {
    console.error('Error en la transcripción de audio:', error);
  } finally {
    setLoading(false);
  }
};

  

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Speech to Text with OpenAI</Text>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={transcribeAudio} style={styles.transcribe}>
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Transcribe Audio</Text>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  headingText: {
    alignSelf: 'center',
    marginVertical: 26,
    fontWeight: 'bold',
    fontSize: 26,
  },
  btnContainer: {
    alignItems: 'center',
  },
  transcribe: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
  },
});

export default App;
