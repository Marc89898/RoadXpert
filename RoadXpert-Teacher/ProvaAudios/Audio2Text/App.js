import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const azureApiKey = '7190332d56704eb68d71e03de633cead'; // Reemplaza con tu clave de API de Azure
const azureEndpoint = 'https://eastus.api.cognitive.microsoft.com/speechtotext/v3.1/transcriptions';

const transcribeAudioFiles = async () => {
  try {
    const response = await fetch(azureEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': azureApiKey,
      },
      body: JSON.stringify({
        displayName: 'My Transcription',
        description: 'Speech Studio Batch speech to text',
        // audio en ingles
        locale: 'en-us',
        contentUrls: [
        //  'https://crbn.us/hello.wav',
        'https://crbn.us/whatstheweatherlike.wav'
        ],
        model: {
          self: 'https://eastus.api.cognitive.microsoft.com/speechtotext/v3.2-preview.1/models/base/e418c4a9-9937-4db7-b2c9-8afbff72d950'
        },
        properties: {
          wordLevelTimestampsEnabled: false,
          displayFormWordLevelTimestampsEnabled: true,
          diarizationEnabled: false,
          punctuationMode: 'DictatedAndAutomatic',
          profanityFilterMode: 'Masked'
        },
        customProperties: {}
      }),
    });

    if (!response.ok) {
      throw new Error('Error al realizar la solicitud a la API de Azure');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la solicitud a la API de Azure:', error);
    throw error;
  }
};

const App = () => {
  const [isLoading, setLoading] = useState(false);

  const getContentUrlFromTranscription = async (transcriptionFilesUrl) => {
    console.log('Transcription Files URL:', transcriptionFilesUrl);
    try {
      const response = await fetch(transcriptionFilesUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Ocp-Apim-Subscription-Key': azureApiKey,
        },
      });

      if (!response.ok) {
        throw new Error('Error al obtener el contenido desde la URL');
      } else 
        console.log('Response: ', response);
        console.log('Response Code: ', response.status);

        const data = await response.json();
        console.log('Data: ', data);

      return data.values[0].links.contentUrl;
    } catch (error) {
      console.error('Error al obtener el contenido desde la URL:', error);
      throw error;
    }
  };
  
  const transcribeAudio = async () => {
    setLoading(true);
    try {
      const transcriptionResult = await transcribeAudioFiles();
      console.log('Transcripción exitosa:', transcriptionResult);
  
      // Obtener la URL del contenido de la transcripción
      const contentUrl = await getContentUrlFromTranscription(transcriptionResult.links.files);
      console.log('Content URL:', contentUrl);
      
      // Realizar la solicitud a la URL de contenido
      const response = await fetch(contentUrl);
      if (!response.ok) {
        throw new Error('Error al obtener el contenido de la transcripción');
      }
      console.log('Transcripción:', await response.json().text);
      
      
      // Aquí puedes manejar el texto de la transcripción como lo necesites
    } catch (error) {
      console.error('Error en la transcripción del audio:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Azure Speech to Text Transcription</Text>
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
