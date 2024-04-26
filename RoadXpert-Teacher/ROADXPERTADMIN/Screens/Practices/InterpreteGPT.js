import axios from 'axios';
import { Audio } from 'expo-av';
import env from './../../env';
import ms from '../../prompts/messagesGPT.json';

class InterpreteGPT {
    static async interpretGPT(text) {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [...ms, { role: "user", content: text }] // aquí debe ir todo el JSON junto al 'text'
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

export { InterpreteGPT };
