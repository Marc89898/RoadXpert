import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';
import { AssemblyAI } from 'assemblyai';
import axios from 'axios';
import OpenAI from 'openai';

const ApiKey = "";
const openai = new OpenAI({ apiKey: ApiKey });

const App: React.FC = () => {
  const [transcriptionText, setTranscriptionText] = useState<string>('');

  useEffect(() => {
    async function transcribeAudio() {
      try {

        const client = new AssemblyAI({
          apiKey: '',
        });

        // const FILE_URL = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';
        const FILE_URL = await uploadMediaGetUrl();
        console.log('FILE_URL:', FILE_URL);

        const data = {
          audio_url: FILE_URL
        };

        try {
          const response = await client.transcripts.create(data);
          console.log('Transcription:', response.text);
        } catch (error) {
          console.error('Error transcribing audio:', error);

        }
/** 
        const transcription = await openai.audio.transcriptions.create({
          file: await getAudioFileUploadable(),
          model: "whisper-1",
        });
        
        setTranscriptionText(transcription.text);
**/
      } catch (error) {
        console.error("Error transcribing audio:", error);
        setTranscriptionText('Error occurred during transcription.');
      }
    }

    transcribeAudio();
  }, []);

  const getAudioFileUploadable = async () => {
    
    try {
      // Cargar el archivo de audio desde la carpeta assets
      const asset = Asset.fromModule(require('./data/whatstheweatherlike.mp3'));

      // Descargar el archivo si aún no está descargado
      if (!asset.localUri) {
        await asset.downloadAsync();
      }
      
      // Obtener el URI del archivo local
      const localUri = asset.localUri || asset.uri;

      // Obtener la URI de contenido del archivo local
      const contentUri = await FileSystem.getContentUriAsync(localUri);

      // Crear un flujo de lectura del archivo de audio
      const response = await fetch(contentUri);
      const audioStream = response.body;

      return audioStream;
      
    } catch (error: any) {
      throw new Error(`Error al leer el archivo de audio: ${error.message} `);
    }
  };


  const uploadMediaGetUrl = async () => {
    const baseUrl = 'https://api.assemblyai.com/v2'
    const headers = {
      authorization: '' 
    }

    try {
      // Cargar el archivo de audio desde la carpeta assets
      const asset = Asset.fromModule(require('./data/whatstheweatherlike.mp3'));

      // Descargar el archivo si aún no está descargado
      if (!asset.localUri) {
        await asset.downloadAsync();
      }
      
      // Obtener el URI del archivo local
      const localUri = asset.localUri || asset.uri;

      // const audioData = await fs.readFile(path) en reac native
      const audioData = await fetch(localUri);
      const audioBlob = await audioData.arrayBuffer();


      const uploadResponse = await axios.post(`${baseUrl}/upload`, audioBlob, {
        headers
      });

      const uploadUrl = uploadResponse.data.upload_url;


      const data = {
        audio_url: uploadUrl // You can also use a URL to an audio or video file on the web
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
          break
        } else if (transcriptionResult.status === 'error') {
          throw new Error(`Transcription failed: ${transcriptionResult.error}`)
        } else {
          await new Promise((resolve) => setTimeout(resolve, 3000))
        }
      }








      return uploadUrl;
    } catch (error: any) {
      throw new Error(`Error al leer el archivo de audio: ${error.message} `);
    }
  };



  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>OpenAI Audio Transcription</Text>
      <View style={{ marginTop: 20, padding: 10, borderRadius: 5 }}>
        <Text style={{ fontSize: 16 }}>Transcription Text:</Text>
        <Text>{transcriptionText || 'Transcription in progress...'}</Text>
      </View>
    </View>
  );
};

export default App;


