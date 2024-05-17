import axios from 'axios';
import ms from '../Models/prompts/messagesGPT.json';
// import env from './env';

class GPTManager {
    static async interpretGPT(text) {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [...ms, { role: "user", content: text }]
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${env.GPT3_API_KEY}`,
                    },
                }
            );
            const completions = response.data.choices;
            if (completions.length > 0) {
                const completionText = completions[0].message.content;
                console.log("GPT3 Completions:", completionText);
                return new Anotacio(completionText);
            }
        } catch (error) {
            console.error("Error al interpretar texto con GPT-3:", error);
        }
    }
}

class Anotacio {
    constructor(jsonString) {
        const jsonObject = JSON.parse(jsonString);
        this.tipo = jsonObject.tipo;
        this.CategoriaEscrita = jsonObject.CategoriaEscrita;
        this.categoriaNumerica = jsonObject.categoriaNumerica;
        this.gravedad = jsonObject.gravedad;
    }
}

export default GPTManager;
