// const cohere_key = process.env.COHERE_API_KEY;
const cohere_key = "mq4vtwKRIq2UVJqCmKSX6kiBVpNJECw8IvIUSpHn";
import cohere from "cohere-ai";
cohere.init(cohere_key);
import exampleData from "./examples.json" assert { type: "json" };
const examples = JSON.parse(JSON.stringify(exampleData));

export async function cohereSummary (input) {
    // Cohere summary
    console.log(examples);
    const summarize = await cohere.summarize({model: "summarize-xlarge",
        text: input,
        length: 'short',
        abstractiveness: 'high'
    });
    return summarize;
}

export async function cohereSentiment (input) {
    input = [input];
    console.log(input)
    // analyze sentiment of messages
    const sentiment = await cohere.classify({
        inputs: input,
        examples: examples,
    });
    return sentiment;
}