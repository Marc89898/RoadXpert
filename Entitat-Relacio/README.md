Entitat Relacio Visual

https://drive.google.com/file/d/1S1wbmeLWL4GmDv-eimqu1uwQcg0uRX_X/view?usp=sharing

Entitat Relacio Taules Excel

https://docs.google.com/spreadsheets/d/1ST2jlkX7VeX9rtoDMKkPlCIU2kHJgjxhdRIavzgWkxI/edit?usp=sharing

## Entitats

### Autoescola

Representa una autoescola.

- **Atributs:**
    - Nom: Nom complet de l'autoescola.
    - Adreça: Direccio de l'autoescola.
    - Telèfon: Numero de telefono de contacte de l'autoescola.

### Alumne

Representa un estudiant matriculat a l'autoescola.

- **Atributs:**
    - Nom: Nom complet de l'alumne.
    - DNI: Document Nacional d'Identitat de l'alumne.
    - Adreça: Adreça de l'alumne.
    - Telèfon: Número de telèfon de contacte de l'alumne.

### Carnet

Representa el carnet de conduir d'un alumne, amb detalls sobre la categoria i altres informacions pertinents.

- **Atributs:**
    - Categoria: Categoria del carnet de conduir (B, C, D, etc.).
    - Data d'Expedició: Data en què es va expedir el carnet de conduir.

### Hora

Representa una hora de pràctica general.

- **Atributs:**
    - Data:
    - Hora Inici
    - Hora FI

### Automovil

Representa el cotxe utilitzat per a les pràctiques d'autoescola.

- **Atributs:**
    - Matrícula: Número de matrícula del cotxe.
    - Marca: Marca del cotxe (Ford, Renault, etc.).
    - Model: Model del cotxe (Focus, Clio, etc.).
    - Any: Any de fabricació del cotxe.

### Treballador

Inclou els instructors i altres membres del personal de l'autoescola.

- **Atributs:**
    - Nom: Nom complet del treballador.
    - Cognom
    - Segon Cognom
    - DNI
    - Adreça
    - Sexe
    - Carnet de conduir (Imatge del carnet per davant i darrera)
    - Rol: Rol o funció del treballador a l'autoescola (instructor, administratiu, etc.).

### Anotacio

Registre d'observacions, errors o altres comentaris sobre una pràctica o un alumne.

- **Atributs:**
    - Tipus: Tipus de l'anotació (error, observació, millora).
    - Descripció: Descripció detallada de l'anotació.
    - Posició: Posició exacta on es va fer l'anotació (opcional).

## Relacions

### Matricula

Una relació N:N entre alumne i carnet, on te un atribut personal que es diu Ronda, per saber si l’ha suspes i quants cops.

**Atributs:**

- Ronda: Ronda de pràctica associada a la matrícula.

### Treballa

Relació entre hora y treballador, es com per saber lhorari de cada treballador y la seva disponibitat ja que la relacio te un atribut de estat.

### Solicita

Relació entre matrícula i treballa, indicant que un alumne amb una matricula pot solicitar N treballa que un treballa es una hora de un treballador.

### Asigna

Una relació 1:1 entre treballa, matricula i automovil, que especifica quin treballador està assignat a una hora específica i a quin cotxe utilitzarà.

### Practica

Relació entre treballador, matrícula, cotxe i anotació, que descriu una sessió de pràctica concreta.

- **Atributs:**
    - Ruta: Ruta seguida durant la pràctica.
    - Km: Km recorreguts durant la pràctica.
    - DataInici: Data en què es va començar la pràctica.
    - DataFi: Data en què es va acabar la pràctica.
    - Pagat: Booleà que indica si s'ha pagat la pràctica o no.

### Comet

Relació entre pràctica i anotació, on una pràctica pot tenir diverses anotacions i una anotació pot estar associada a diverses pràctiques.

### Te
Relación 1:N entre autoescola i treballador, indica que una autoescola pot tenir diversos treballadors.
