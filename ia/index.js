import OpenAI from "openai";

export class OpenAIChat {

    constructor(apiKey) {
        this.openai = new OpenAI({
            apiKey: `${apiKey}`,
            baseURL: `https://api.naga.ac/v1`,
        });
    }

    async main(articles) {

        const completion = await this.openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": `Quiero dejar mis malos habitos. Encuentra patrones negativos en ${articles} y muestramelos punto por punto.`
                }
            ],
            stream: true,
        });

        return this.stream(completion)
    }

    async* stream(completion) {
        for await (const chunk of completion) {
            yield chunk.choices[0].delta.content ?? '';
        }
    }

}
