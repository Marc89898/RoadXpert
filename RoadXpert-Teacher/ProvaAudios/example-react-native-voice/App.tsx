import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';

import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { Audio } from 'expo-av';
import env from './env';
import ms from './data/messagesGPT.json';





const App: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [recording, setRecording] = useState();
  const [transcriptionText, setTranscriptionText] = useState<string>('');
  const [respondeGPT, setRespondeGPT] = useState<string>('');
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync( Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = recording.getURI();
    console.log('Recording stopped and stored at', uri);
    try {
      const text = await speechToText(uri);
      setTranscriptionText(text);

      const respondeGPT = await interpretGPT(text);
      if (respondeGPT === undefined) {
        setRespondeGPT('No se pudo interpretar el texto');
        return;
      }

      setRespondeGPT(respondeGPT.tipo +", "+ respondeGPT.CategoriaEscrita +", "+ respondeGPT.categoriaNumerica +", "+ respondeGPT.gravedad);
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscriptionText('Error occurred during transcription.');
    }
  }



  const speechToText = async (audioURL: string) => {
    setLoading(true);
    try {
      const uploadUrl = await uploadAudio(audioURL);
      const transcriptText = await transcribeAudio(uploadUrl);
      setLoading(false);
      return transcriptText;
    } catch (error: any) {
      console.error("Error al transcribir el audio:", error);
      setLoading(false);
      throw new Error(`Error al transcribir el audio: ${error.message}`);
    }
  };
  
  const uploadAudio = async (audioURL: string) => {
    const baseUrl = 'https://api.assemblyai.com/v2';
    const headers = { authorization: env.ASSEMBLY_API_KEY };
  
    const audioData = await fetch(audioURL);
    const audioBlob = await audioData.arrayBuffer();
  
    const uploadResponse = await axios.post(`${baseUrl}/upload`, audioBlob, { headers });
    return uploadResponse.data.upload_url;
  };
  
  const transcribeAudio = async (uploadUrl: string) => {
    const baseUrl = 'https://api.assemblyai.com/v2';
    const headers = { authorization: env.ASSEMBLY_API_KEY };
  
    const data = { audio_url: uploadUrl, language_code: 'es' };
    const response = await axios.post(`${baseUrl}/transcript`, data, { headers });
  
    const transcriptId = response.data.id;
    const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`;
  
    while (true) {
      const pollingResponse = await axios.get(pollingEndpoint, { headers });
      const transcriptionResult = pollingResponse.data;
  
      if (transcriptionResult.status === 'completed') {
        return transcriptionResult.text;
      } else if (transcriptionResult.status === 'error') {
        throw new Error(`Transcription failed: ${transcriptionResult.error}`);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 3000));
      }
    }
  };
  
  

  const interpretGPT = async (text: string) => {
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [ ...ms , { role: "user", content: text }] // aqui debe ir todo el jsonjunto al 'text'
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${env.GPT3_API_KEY}`,
          },
        }
      );
      const completions = response.data.choices;
      if (completions.length > 0) {
        const completionText = completions[0].message.content;
        console.log("GPT3 Completions:", completionText);

        return new anotacio(completionText);

      }
    } catch (error) {
      console.error("Error al interpretar texto con GPT-3:", error);
    }
  };
  

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Speech to Text with AssemblyAI</Text>
        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startRecording} style={styles.transcribe}>
              <Button
              title={recording ? 'Stop Recording' : 'Start Recording'}
              onPress={recording ? stopRecording : startRecording}
            />
            </TouchableOpacity>
          )}
        </View>
        <Text style={{ marginTop: 16, textAlign: 'center' }}>Transcripcion: </Text>
        <Text style={{ marginTop: 16, textAlign: 'center' }}>{transcriptionText}</Text>

        <Text style={{ marginTop: 16, textAlign: 'center' }}>Interpretacion ChatGPT </Text>
        <Text style={{ marginTop: 16, textAlign: 'center' }}>{respondeGPT}</Text>
      </SafeAreaView>
    </View>
  );
};


class anotacio {
  constructor(jsonString : string) {
    const jsonObject = JSON.parse(jsonString);
    this.tipo = jsonObject.tipo;
    this.CategoriaEscrita = jsonObject.CategoriaEscrita;
    this.categoriaNumerica = jsonObject.categoriaNumerica;
    this.gravedad = jsonObject.gravedad;
  }
  tipo: string;
  CategoriaEscrita: string;
  categoriaNumerica: number;
  gravedad: string;
}




const styles = StyleSheet.create({
  // Your style definitions here
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
