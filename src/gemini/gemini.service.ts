import { Injectable } from '@angular/core';
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from '@google/generative-ai';

@Injectable({
  providedIn: 'root',
})
export class GoogleGeminiProService {
  generationConfig = {
    safetySettings: [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
      },
    ],
    temperature: 0.9,
    top_p: 1,
    top_k: 32,
    maxOutputTokens: 100, // limit output
  };

  readonly #API_KEY = 'AIzaSyDrFMvd5Z1TFrXLnzZ8uX_NctKsUtGaFko';
  readonly #genAI = new GoogleGenerativeAI(this.#API_KEY);
  readonly #model = this.#genAI.getGenerativeModel({
    model: 'gemini-pro',
    ...this.generationConfig,
  });

  async verifyIfTopicCorrect(topic: string, text: string): Promise<string> {
    console.log(topic, text);
    let prompt = `Tengo este texto ${text} y tiene que estar relacionado con este tema: ${topic}, o sea, no necesariamente, tiene que decir explícitamente, ${topic}, si menciona algo que tenga que ver con ese tema, devuelve si, si es correcto, y si no devuelve no, SOLO DEVUELVE SI O NO`;

    try {
      const { response } = await this.#model.generateContent(prompt);
      return response.text();
    } catch (error) {
      console.error(error);
      return 'An error has occurred. Please try again.';
    }
  }

  async verifyIfQuestionsRight(topic: string, text: string): Promise<string> {
    console.log(topic, text);
    let prompt = `Tengo este texto: ${text}. Debe estar relacionado con este tema: ${topic} y además tiene que ser específicamente algo relacionado con preguntas y respuestas. Si cumple con estas condiciones, responde únicamente con 'sí'. Si no cumple, responde únicamente con 'no'.`;

    try {
      const { response } = await this.#model.generateContent(prompt);
      console.log(response.text());
      return response.text();
    } catch (error) {
      console.error(error);
      return 'An error has occurred. Please try again.';
    }
  }
}
