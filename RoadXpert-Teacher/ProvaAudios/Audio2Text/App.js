import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Voice from '@react-native-community/voice';
import requestAudioPermission from './permission';

const App = () => {
  const [result, setResult] = useState('');
  const [isLoading, setLoading] = useState(false);

  var voiceObj = new Voice();

  const speechStartHandler = e => {
    console.log('speechStart successful', e);
  };
  const speechEndHandler = e => {
    setLoading(false);
    console.log('stop handler', e);
  };

  const speechResultsHandler = e => {
    const text = e.value[0];
    setResult(text);
  };

  const startRecording = async () => {
    setLoading(true);
    try {
      await voiceObj.start('en-Us');
    } catch (error) {
      console.log('error', error);
    }
  };

  const stopRecording = async () => {
    try {
      await voiceObj.stop();
      setLoading(false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const clear = () => {
    setResult('');
  };

  useEffect(() => {
    const initializeVoice = async () => {
      try {
        await requestAudioPermission();
        
        voiceObj = new Voice();
        voiceObj.onSpeechStart = speechStartHandler;
        voiceObj.onSpeechEnd = speechEndHandler;
        voiceObj.onSpeechResults = speechResultsHandler;
        console.log('Voice initialized' + (await voiceObj.isAvailable()));
      } catch (error) {
        console.error('Error initializing Voice:', error);
      }
    };

    initializeVoice();

    return () => {
      voiceObj.destroy().then(voiceObj.removeAllListeners);
    };
  }, []);

  console.log('speech recognition');
  
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.headingText}>Voice to Text Recognition</Text>
        <View style={styles.textInputStyle}>
          <TextInput
            value={result}
            multiline={true}
            placeholder="say something!"
            style={{
              flex: 1,
              height: '100%',
            }}
            onChangeText={text => setResult(text)}
          />
        </View>

        <View style={styles.btnContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <TouchableOpacity onPress={startRecording} style={styles.speak}>
              <Text style={{color: 'white', fontWeight: 'bold'}}>Speak</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.stop} onPress={stopRecording}>
            <Text style={{color: 'white', fontWeight: 'bold'}}>Stop</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.clear} onPress={clear}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Clear</Text>
        </TouchableOpacity>
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
  textInputStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    height: 300,
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 16,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    elevation: 2,
    shadowOpacity: 0.4,
    color: '#000',
  },
  speak: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  stop: {
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 8,
  },
  clear: {
    backgroundColor: 'black',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
  },
  btnContainer: {
    display: 'flex',
    flexDirection: 'row',
    with: '50%',
    justifyContent: 'space-evenly',
    marginTop: 24,
  },
});

export default App;