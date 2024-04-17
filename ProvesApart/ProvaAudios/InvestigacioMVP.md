## RoadXpert - Documentació del Projecte

### Objectiu de l'Aplicació

L'objectiu principal de RoadXpert és proporcionar als usuaris una eina mòbil que els permeti enregistrar àudios durant la conducció, convertir aquests àudios en text i analitzar el tipus d'errors comesos durant la conducció, centrant-se principalment en les faltes comeses.

### Procediment

El projecte es desenvoluparà seguint els següents passos:

   1. **Configuració de l'Entorn:**
      - Instala Node.js si aún no lo tienes instalado. Puedes descargarlo e instalarlo desde el [sitio web oficial de Node.js](https://nodejs.org/).
      
      - Instala Expo CLI globalmente ejecutando el siguiente comando en la terminal:
      ```
      npm install -g expo-cli
      ```

      - Para crear un nuevo proyecto de React Native con Expo, ejecuta el siguiente comando en la terminal y sigue las instrucciones que aparecen:
      ```
      npx expo-cli init NOMBRE_DEL_PROYECTO
      ```
      Esto te guiará a través de un asistente que te permitirá elegir una plantilla para tu proyecto, como "blank", "minimal", "tabs", etc.

      - Navega a la carpeta de tu proyecto en la terminal:
      ```
      cd NOMBRE_DEL_PROYECTO
      ```
      
      - Inicia el servidor de desarrollo de Expo ejecutando:
      ```
      npm start
      ```
      Esto iniciará el servidor de desarrollo de Expo y abrirá una ventana del navegador con un panel de control.
      
      - Escanea el código QR con la aplicación Expo Go en tu dispositivo móvil para abrir tu proyecto en Expo.


2. **Desenvolupament del MVP:**

   **Enregistrament d'àudio:**

   - Implementar la funcionalitat bàsica d'enregistrament d'àudio utilitzant les API proporcionades per React Native.
      Per implementar la funcionalitat d'enregistrament d'àudio, podem utilitzar les següents API proporcionades per React Native:
      - **[react-native-audio-recorder-player](https://www.npmjs.com/package/react-native-audio-recorder-player)**: Aquesta és una llibreria de React Native que permet enregistrar àudio des del dispositiu mòbil.
      - **[react-native-audio](https://www.npmjs.com/package/react-native-audio-record)**: Una altra llibreria de React Native per a l'enregistrament i reproducció d'àudio.

   **Conversió d'àudio a text:**
   - Integrar un component per convertir àudio a text, utilitzant serveis de reconeixement de veu com ara Google Cloud Speech-to-Text o AWS Transcribe.
      Per convertir àudio a text, podem integrar serveis de reconeixement de veu com ara:
      - **[Google Cloud Speech-to-Text API](https://cloud.google.com/speech-to-text)**: Aquesta API de Google Cloud permet transcriure àudios en temps real o en mode batch a text.
      - **[AWS Transcribe](https://aws.amazon.com/transcribe/)**: Un servei de reconeixement de veu automatitzat d'Amazon Web Services (AWS) que converteix àudios en temps real o arxius d'àudio a text.

   **Mòdul d'anàlisi de text:**
   - Desenvolupar un mòdul d'anàlisi de text per identificar el tipus de faltes comeses durant la conducció.
      Per analitzar el text generat a partir dels àudios enregistrats, podem implementar un mòdul d'anàlisi de text que utilitzi tècniques de processament del llenguatge natural (NLP) per identificar el tipus de faltes de conducció. Aquest mòdul pot incloure:
      - **Processament de text**: Extracció de paraules clau, anàlisi de sentiments, detecció d'entitats, etc.
      - **Classificació de text**: Utilitzant algoritmes d'aprenentatge automàtic per classificar el text en diferents categories de faltes de conducció, com ara excessos de velocitat, distraccions, infraccions de senyals de trànsit, etc.

   **Interfície d'Usuari (UI):**
   - Crear una interfície d'usuari senzilla per mostrar els resultats de l'anàlisi de text.
      La interfície d'usuari ha de ser simple i intuïtiva. Podem utilitzar components comuns de React Native per crear una interfície agradable i fàcil d'utilitzar. Alguns components que podrien ser útils inclouen:
      - **Botons**: Per iniciar i aturar l'enregistrament d'àudio i iniciar el procés de conversió de text.
      - **Caixes de text**: Per mostrar el text transcrit i els resultats de l'anàlisi.
      - **Ícones**: Per indicar les diferents accions i estats de l'aplicació, com ara enregistrament, pausa, error, etc.
      

   Utilitzant aquestes eines i recursos, serà possible desenvolupar el MVP de RoadXpert que permeti als usuaris enregistrar àudios durant la conducció, convertir-los a text i analitzar el tipus de faltes comeses.

3. **Proves i Depuració:**
   - Realitzar proves exhaustives de la funcionalitat d'enregistrament d'àudio i conversió de text.
   - Depurar qualsevol error o problema trobat durant les proves.

4. **Optimització i Millores:**
   - Optimitzar el rendiment de l'aplicació.
   - Millorar la usabilitat de la interfície d'usuari segons sigui necessari.
   - Implementar qualsevol característica addicional requerida per millorar l'experiència de l'usuari.

### MVP (Producte Mínim Viable)

El Producte Mínim Viable (MVP) de RoadXpert constarà de les següents característiques:

1. Funcionalitat bàsica d'enregistrament d'àudio.
2. Conversió d'àudio a text.
3. Anàlisi bàsic de text per identificar faltes comeses durant la conducció.
4. Interfície d'usuari senzilla per a l'enregistrament d'àudio i la visualització de resultats.

El MVP proporcionarà una base sòlida sobre la qual es poden afegir característiques addicionals en versions futures de l'aplicació.