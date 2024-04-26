
class AudioManagment {
    static async startRecording(setRecording, requestPermission, setLoading) {
        try {
            const permissionResponse = await Audio.usePermissions();
            if (permissionResponse.status !== 'granted') {
                console.log('Requesting permission..');
                await requestPermission();
            }
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            console.log('Starting recording..');
            const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
            setRecording(recording);
            console.log('Recording started');
        } catch (err) {
            console.error('Failed to start recording', err);
        } finally {
            setLoading(false);
        }
    }

    static async stopRecording(recording, setRecording, speechToText, setTranscriptionText, interpretGPT, setRespondeGPT) {
        console.log('Stopping recording..');
        setRecording(undefined);
        await recording.stopAndUnloadAsync();
        await Audio.setAudioModeAsync({ allowsRecordingIOS: false });

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

            setRespondeGPT(respondeGPT.tipo + ", " + respondeGPT.CategoriaEscrita + ", " + respondeGPT.categoriaNumerica + ", " + respondeGPT.gravedad);
        } catch (error) {
            console.error("Error transcribing audio:", error);
            setTranscriptionText('Error occurred during transcription.');
        }
    }

    static async speechToText(audioURL, setLoading, uploadAudio, transcribeAudio) {
        setLoading(true);
        try {
            const uploadUrl = await this.uploadAudio(audioURL);
            const transcriptText = await this.transcribeAudio(uploadUrl);
            return transcriptText;
        } catch (error) {
            console.error("Error al transcribir el audio:", error);
            throw new Error(`Error al transcribir el audio: ${error.message}`);
        } finally {
            setLoading(false);
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
                throw new Error(`Transcription failed: ${transcriptionResult.error}`);
            } else {
                await new Promise((resolve) => setTimeout(resolve, 3000));
            }
        }
    }
}
