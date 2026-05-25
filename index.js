import OpenAI from "openai";
import readline from 'readline/promises';
import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config()

/**
 * Validate required environment variables
 */

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY in .env file");
}

if (!process.env.SERPER_API_KEY) {
  throw new Error("Missing SERPER_API_KEY in .env file");
}


/**
 * Constants
 */
const MODEL = "llama-3.3-70b-versatile";

const SERPER_URL = "https://google.serper.dev/search";

/**
 * Groq uses OpenAI-compatible API
 */
const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});


/**
 * Tool definition
 */
const tools = [
  {
    type: "function",
    function: {
      name: "webSearch",
      description: "Search latest and real-time information from the internet",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query",
          },
        },
        required: ["query"],
      },
    },
  },
];

/**
* Start app safely
*/
try {
  await callAgent();
} catch (error) {
  console.error("Fatal error:", error.message);
  process.exit(1);
}


async function callAgent() {


  /**
   * Create command-line interface
   * so the user can ask questions from terminal.
   */
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });



  /**
   * Conversation memory.
   * The system message tells the model how to behave
   * and which tools are available.
   */
  let messages = [{
    role: "system",
    content: `You are a smart assistant who answers the asked questions.
        You have access to the following tools:
        1.searchWeb({query}) : {query:string} // Search the latest information and realtime data from the internet.

        current Date and Time: ${new Date().toUTCString()}
        
        `
  },

  ]


  console.log("AI Agent started. Type 'exit' to quit.");


  /**
     * Main user loop.
     * Type "exit" to stop the program.
     */
  while (true) {

    const question = await rl.question('\nAsk a question: ');

    if (!question) {
      console.log("Please enter a valid question.");
      continue;
    }
    if (question.toLowerCase() === "exit") {
      console.log("Goodbye!");
      rl.close();
      break;
    }

    messages.push({
      role: 'user',
      content: question
    })


    /**
    * Agent loop.
    * The model may call a tool one or more times.
    * We keep looping until the model returns a final answer.
    */
    while (true) {
      try {
        const response = await client.chat.completions.create({
          model: MODEL,
          temperature: 0,
          messages,
          tools,
          tool_choice: "auto",
        });


        messages.push(response.choices[0].message);
        const toolCalls = response.choices[0].message.tool_calls;


        if (!toolCalls) {
          console.log('agent response:\n\n', response.choices[0].message.content);
          break
        }
        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name;
          const functionParams = toolCall.function.arguments

          if (functionName === 'webSearch') {
            const toolResult = await webSearch(JSON.parse(functionParams));

            messages.push({
              tool_call_id: toolCall.id,
              role: 'tool',
              name: functionName,
              content: toolResult

            })
          }
        }
      } catch (error) {
        console.error("Groq API error:", error.message);
        throw new Error("Failed to get response from Groq API");
      }


    }
  }




}




async function webSearch({ query }) {
  console.log('calling web search....')

  try {

    const response = await axios.post(
      "https://google.serper.dev/search",
      {
        q: query
      },
      {
        headers: {
          "X-API-KEY": process.env.SERPER_API_KEY,
          "Content-Type": "application/json"
        }
      }
    );

    const data = response.data;
    // Extract organic search results
    const results = data.organic?.slice(0, 5) || [];

    if (results.length === 0) {
      return "No search results found.";
    }

    // Format results nicely
    const formattedResults = results.map((item, index) => {
      return `
Snippet: ${item.snippet}
`;
    });

    return formattedResults.join("\n");
  } catch (error) {

    console.error("SERPER API error:", error.message);
    throw new Error("Failed to get response from SERPER API");
  }

}






