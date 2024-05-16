import { Audio } from 'expo-av';
import axios from 'axios';
import env from './env';

class AudioManager {
    static async startRecording() {
        try {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permisos de audio denegados');
                return;
            }

            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            return recording;
        } catch (error) {
            console.error('Error al iniciar la grabación:', error);
            throw error;
        }
    }

    static async stopRecording(recording) {
        try {
            console.log('Deteniendo la grabación...');
            await recording.stopAndUnloadAsync();
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: false,
            });
            const uri = recording.getURI();
            console.log('Grabación detenida y almacenada en:', uri);
            return uri;
        } catch (error) {
            console.error('Error al detener la grabación:', error);
            throw error;
        }
    }

    static async uploadAudio(audioURL) {
        const baseUrl = 'https://api.assemblyai.com/v2';
        const headers = { authorization: env.ASSEMBLY_API_KEY };

        const audioData = await fetch(audioURL);
        const audioBlob = await audioData.arrayBuffer();

        const uploadResponse = await axios.post(`${baseUrl}/upload`, audioBlob, { headers });
        return uploadResponse.data.upload_url;
    }

    static async transcribeAudio(uploadUrl) {
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
                throw new Error(`Transcripción fallida: ${transcriptionResult.error}`);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    }

    static async speechToText(audioURL) {
        try {
            const uploadUrl = await this.uploadAudio(audioURL);
            const transcriptText = await this.transcribeAudio(uploadUrl);
            return transcriptText;
        } catch (error) {
            console.error('Error al transcribir el audio:', error);
            throw error;
        }
    }
}

export default AudioManager;
