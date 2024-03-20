## RoadXpert - Documentació del Projecte

### Objectiu de l'Aplicació

L'objectiu principal de RoadXpert és proporcionar als usuaris una eina mòbil que els permeti enregistrar àudios durant la conducció, convertir aquests àudios en text i analitzar el tipus d'errors comesos durant la conducció, centrant-se principalment en les faltes comeses.

### Procediment

El projecte es desenvoluparà seguint els següents passos:

1. **Configuració de l'Entorn:**
   - Instal·lar Node.js si no està instal·lat.
   - Instal·lar Expo CLI globalment mitjançant la següent comanda a la terminal:
     ```
     npm install -g expo-cli
     ```
   - Crear un nou projecte React Native utilitzant Expo CLI amb la plantilla "blank" o "minimal".

2. **Desenvolupament del MVP:**
   - Implementar la funcionalitat bàsica d'enregistrament d'àudio utilitzant les API proporcionades per React Native.
   - Integrar un component per convertir àudio a text, utilitzant serveis de reconeixement de veu com ara Google Cloud Speech-to-Text o AWS Transcribe.
   - Desenvolupar un mòdul d'anàlisi de text per identificar el tipus de faltes comeses durant la conducció.
   - Crear una interfície d'usuari senzilla per mostrar els resultats de l'anàlisi de text.

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