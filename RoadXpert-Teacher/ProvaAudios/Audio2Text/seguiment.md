# Seguiment
## 22/03/2024
Durant els últims 3 dies, he estat investigant diverses maneres de transcriure àudio a text utilitzant React Native. Tot i seguir diversos tutorials, no he aconseguit que cap d'ells funcioni, llibreries com @react-native-tts i @react-native-community/voice. Sembla que alguns d'aquests tutorials estan desactualitzats i no proporcionen resultats satisfactoris. Després d'investigar, he identificat tres opcions principals: OpenAI, Azure i Google API. Totes tres opcions estan basades en tecnologies similars i ofereixen serveis de transcripció de pagament pero amb una prova gratiuita.

Com que ja disposava d'un compte a Microsoft Azure, he decidit provar aquesta opció. Actualment, estic experimentant amb un àudio d'una URL externa i realitzant proves per avaluar l'eficàcia de la transcripció utilitzant Azure Speech to Text API.

## 02/04/2024
Mentre treballava en el desenvolupament de la meva aplicació, he trobat un problema relacionat amb les sol·licituds HTTP. En particular, he observat un comportament inconsistent en la variable transcriptionFilesUrl que utilitzo per fer sol·licituds a una API. Quan sobreescric directament el valor d'aquesta variable amb la URL de destí, obtinc una resposta correcta de l'API. No obstant això, quan utilitzo la variable sense modificar, l'API respon amb una matriu buida values.

Aquest comportament inesperat m'ha portat a sospitar que alguna part del codi o un procés previ està alterant el valor de la variable transcriptionFilesUrl de manera inesperada. Tot i realitzar diverses proves i revisions, encara no he trobat una solució clara al problema.

Continuaré investigant per identificar l'origen exacte del problema i trobar una solució adequada.
Probare de fer servir la API de OpenIA ja que la de l'Azure m'esta donant problemes.