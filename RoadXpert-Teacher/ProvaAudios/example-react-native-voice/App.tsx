import React, { useEffect, useState } from 'react';
import { Button, StyleSheet } from 'react-native';

import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { AssemblyAI } from 'assemblyai';
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
      await uploadMediaGetUrl(uri);    
    } catch (error) {
      console.error("Error transcribing audio:", error);
      setTranscriptionText('Error occurred during transcription.');
    }
  }



  const uploadMediaGetUrl = async (audioURL : string) => {
    // const assemblyAI = new AssemblyAI({
    //   apiKey: 'd0a17141be774bb4a538c7990af110d5',
    // });
    setLoading(true);
    const baseUrl = 'https://api.assemblyai.com/v2'
    const headers = {
      authorization: env.ASSEMBLY_API_KEY
    }

    try {
      // Cargar el archivo de audio desde la carpeta assets
      // const asset = Asset.fromModule(require('./data/whatstheweatherlike.mp3'));
      const asset = Asset.fromModule(require('./data/whatstheweatherlike.mp3'));

      // Descargar el archivo si aún no está descargado
      if (!asset.localUri) {
        await asset.downloadAsync();
      }
      
      // Obtener el URI del archivo local
      const localUri = asset.localUri || asset.uri;

      // const audioData = await fs.readFile(path) en reac native
      const audioData = await fetch(audioURL);
      const audioBlob = await audioData.arrayBuffer();


      const uploadResponse = await axios.post(`${baseUrl}/upload`, audioBlob, {
        headers
      });

      const uploadUrl = uploadResponse.data.upload_url;

      const data = {
        audio_url: uploadUrl, // You can also use a URL to an audio or video file on the web
        language_code: 'es'
      }

      const url = `${baseUrl}/transcript`
      const response = await axios.post(url, data, { headers: headers });

      const transcriptId = response.data.id
      const pollingEndpoint = `${baseUrl}/transcript/${transcriptId}`

      while (true) {
        const pollingResponse = await axios.get(pollingEndpoint, {
          headers: headers
        })
        const transcriptionResult = pollingResponse.data

        if (transcriptionResult.status === 'completed') {
          console.log(transcriptionResult.text)
          setTranscriptionText(transcriptionResult.text);
          interpretGPT(transcriptionResult.text)
          break
        } else if (transcriptionResult.status === 'error') {
          throw new Error(`Transcription failed: ${transcriptionResult.error}`)
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      }
      setLoading(false);

      return uploadUrl;
    } catch (error: any) {
      throw new Error(`Error al leer el archivo de audio: ${error.message} `);
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

        const respondeGPT = new ResponseGPT(completionText);

        console.log("GPT3 Completions:", completionText);
        setRespondeGPT(respondeGPT.tipo +", "+ respondeGPT.CategoriaEscrita +", "+ respondeGPT.categoriaNumerica +", "+ respondeGPT.gravedad);
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


class ResponseGPT {
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
