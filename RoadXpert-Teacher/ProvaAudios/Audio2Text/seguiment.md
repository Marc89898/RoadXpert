# Seguiment
## 22/03/2024
Durant els últims 3 dies, he estat investigant diverses maneres de transcriure àudio a text utilitzant React Native. Tot i seguir diversos tutorials, no he aconseguit que cap d'ells funcioni, llibreries com @react-native-tts i @react-native-community/voice. Sembla que alguns d'aquests tutorials estan desactualitzats i no proporcionen resultats satisfactoris. Després d'investigar, he identificat tres opcions principals: OpenAI, Azure i Google API. Totes tres opcions estan basades en tecnologies similars i ofereixen serveis de transcripció de pagament pero amb una prova gratiuita.

Com que ja disposava d'un compte a Microsoft Azure, he decidit provar aquesta opció. Actualment, estic experimentant amb un àudio d'una URL externa i realitzant proves per avaluar l'eficàcia de la transcripció utilitzant Azure Speech to Text API.

## 02/04/2024
Mentre treballava en el desenvolupament de la meva aplicació, he trobat un problema relacionat amb les sol·licituds HTTP. En particular, he observat un comportament inconsistent en la variable transcriptionFilesUrl que utilitzo per fer sol·licituds a una API. Quan sobreescric directament el valor d'aquesta variable amb la URL de destí, obtinc una resposta correcta de l'API. No obstant això, quan utilitzo la variable sense modificar, l'API respon amb una matriu buida values.

Aquest comportament inesperat m'ha portat a sospitar que alguna part del codi o un procés previ està alterant el valor de la variable transcriptionFilesUrl de manera inesperada. Tot i realitzar diverses proves i revisions, encara no he trobat una solució clara al problema.

Continuaré investigant per identificar l'origen exacte del problema i trobar una solució adequada.

Per abordar aquest problema, he realitzat una revisió exhaustiva del flux de treball de la meva aplicació per identificar qualsevol modificació o ús inesperat de la variable transcriptionFilesUrl. A més, he millorat els missatges de depuració i he implementat un maneig d'errors més eficaç per comprendre millor el comportament de les sol·licituds HTTP.

En conclusió, aquests dies he après la importància de la depuració minuciosa i la revisió del flux de treball del codi per solucionar problemes inesperats. Aquesta experiència m'ha proporcionat una comprensió més profunda de la gestió de les variables i la importància de mantenir la consistència en el flux de treball del codi.


## 05/04/2024
A causa del problema amb l'API d'Azure que no s'ha pogut resoldre, els darrers dies he estat provant diverses llibreries i APIs, entre elles l'API de Assembly AI, la de Google i la d'OpenAI, entre altres llibreries de codi obert. Finalment, he aconseguit que funcioni amb Assembly AI. Ja he realitzat una transcripció d'un àudio en castellà. Haig de mirar que es pugui fer en catala.