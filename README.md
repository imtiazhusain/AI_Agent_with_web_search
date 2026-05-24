# 🤖 AI Agent with Groq + Serper

A powerful terminal-based AI Agent built using:

- 🚀 Groq API (LLM)
- 🌐 Serper API (Google Search)
- 🧠 Function Calling / Tool Use
- 💬 Interactive CLI Chatbot
- ⚡ Node.js

This AI agent can answer questions, search the internet in real-time, use tools automatically, and maintain conversation memory.

---

# ✨ Features

- ✅ Real-time web search
- ✅ Tool calling support
- ✅ Conversation memory
- ✅ Interactive terminal chat
- ✅ Error handling
- ✅ Uses Groq ultra-fast inference
- ✅ OpenAI-compatible SDK
- ✅ Modular architecture
- ✅ Automatic tool selection

---

# 🧠 What Makes This an AI Agent?

This project is not just a chatbot.

It becomes an **AI Agent** because it can:

1. Understand user requests
2. Decide when external tools are needed
3. Automatically call tools
4. Process tool results
5. Generate intelligent responses

Example:

User asks:

```bash
latest AI news
```

The model decides it needs internet access → calls the `webSearch()` tool → gets live results → answers the user.

---

# 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| Node.js | Runtime |
| Groq API | Large Language Model |
| OpenAI SDK | API communication |
| Serper API | Google Search |
| Axios | HTTP requests |
| Dotenv | Environment variables |
| Readline | Terminal interaction |

---

# 📂 Project Structure

```bash
project/
│
├── index.js
├── package.json
├── package-lock.json
├── .env
└── README.md
```

---

# 📦 Installation

## 1. Clone Repository

```bash
git clone https://github.com/imtiazhusain/AI_Agent_with_web_search.git
```

---

## 2. Enter Project Folder

```bash
cd AI_Agent_with_web_search
```

---

## 3. Install Dependencies

```bash
npm install
```

---

# 📥 Required Packages

```bash
npm install openai axios dotenv
```

---

# 🔑 API Keys Setup

Create a `.env` file in the root directory.

## `.env`

```env
GROQ_API_KEY=your_groq_api_key
SERPER_API_KEY=your_serper_api_key
```

---

# 🌐 Get API Keys

## 🚀 Groq API

Create your API key here:

https://console.groq.com/keys

---

## 🔎 Serper API

Create your API key here:

https://serper.dev

---

# ▶️ Run the Project

```bash
npm run start
```

---

# 💬 Example Usage

```bash
AI Agent started. Type 'exit' to quit.

Ask a question: latest AI news

calling web search....

agent response:

OpenAI released new updates for...
```

---

# ⚙️ How the AI Agent Works

## 1. User Input

The user types a question in the terminal.

```js
const question = await rl.question('\nAsk a question: ');
```

---

## 2. Conversation Memory

All messages are stored in the `messages` array.

```js
messages.push({
  role: 'user',
  content: question
});
```

This allows the AI to remember previous conversation context.

---

## 3. LLM Request

The conversation is sent to Groq.

```js
const response = await client.chat.completions.create({
  model: MODEL,
  temperature: 0,
  messages,
  tools,
  tool_choice: "auto",
});
```

---

## 4. Tool Calling

The model can automatically decide to use tools.

Tool definition:

```js
const tools = [
  {
    type: "function",
    function: {
      name: "webSearch",
      description: "Search latest and real-time information from the internet",
    },
  },
];
```

---

## 5. Web Search Execution

The `webSearch()` function calls Serper API.

```js
const response = await axios.post(
  "https://google.serper.dev/search",
  {
    q: query
  }
);
```

---

## 6. Tool Results Returned to AI

Search snippets are added back into conversation memory.

```js
messages.push({
  tool_call_id: toolCall.id,
  role: 'tool',
  name: functionName,
  content: toolResult
});
```

---

## 7. Final AI Response

The AI reads the search results and generates a final answer.

---

# 🧩 Complete Flow Diagram

```bash
User Question
      ↓
Groq LLM
      ↓
Decides Tool Needed?
      ↓
Calls webSearch()
      ↓
Serper API Search
      ↓
Returns Search Results
      ↓
LLM Reads Results
      ↓
Final AI Response
```

---

# 📌 Important Note

Make sure the tool name matches everywhere.

✅ Correct:

```js
webSearch
```

❌ Incorrect:

```js
searchWeb
```

In your system prompt you used:

```js
searchWeb({query})
```

But the actual function name is:

```js
webSearch
```

These names must match.

---

# 🔥 Key Concepts Used

## 🔹 Function Calling

The AI can call JavaScript functions as tools.

---

## 🔹 Tool Use

The model dynamically chooses when tools are needed.

---

## 🔹 Conversation Memory

The `messages` array stores chat history.

---

## 🔹 Agent Loop

The AI continues looping until no more tools are required.

```js
while (true)
```

---

# 🚀 Future Improvements

You can expand this AI agent with:

- 🌦️ Weather Tool
- 🧮 Calculator Tool
- 📄 PDF Reader
- 🧠 Vector Database Memory
- 🎤 Voice Assistant
- 🌐 Web UI (React / Next.js)
- 📂 File Upload Support
- 🔊 Text-to-Speech
- 🎥 Vision Models
- 📡 Streaming Responses
- 🧠 Multi-Agent Systems

---

# 🛡️ Error Handling

The project includes:

- Missing API key validation
- Groq API error handling
- Serper API error handling
- Invalid input handling

Example:

```js
if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY in .env file");
}
```

---

# 📚 Learning Topics Covered

This project helps you learn:

- AI Agents
- Tool Calling
- OpenAI SDK
- Groq API
- REST APIs
- Async/Await
- Node.js CLI Apps
- Prompt Engineering
- LLM Workflows

---

# 📄 License

MIT License

---

# 👨‍💻 Author

Built with ❤️ using:

- Groq
- Serper
- Node.js
- OpenAI SDK

---

# ⭐ Support

If you like this project:

- ⭐ Star the repository
- 🍴 Fork the project
- 🧠 Build your own AI tools
- 🚀 Share improvements

---

# 🤝 Contributing

Pull requests are welcome.

For major changes, please open an issue first to discuss what you would like to change.

---

# 📧 Contact

Feel free to connect and contribute to improve this AI Agent project.
