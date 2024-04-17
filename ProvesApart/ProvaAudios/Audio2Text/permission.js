import { PermissionsAndroid } from 'react-native';

const requestAudioPermission = async () => {
  try {
    // Request audio recording permission

    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      {
        title: 'Audio Permission',
        message: 'Necesitamos acceso al micrófono para grabar audio.',
        buttonNeutral: 'Preguntar luego',
        buttonNegative: 'Cancelar',
        buttonPositive: 'Aceptar',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permiso de audio otorgado');
    } else {
      console.log('Permiso de audio denegado');
    }
  } catch (error) {
    console.warn('Error al solicitar permiso de audio:', error);
  }
};

export default requestAudioPermission;