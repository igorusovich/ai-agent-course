// ============================================================
// Lesson 1: Your First CLI Chatbot
// ============================================================
// TASK: Fill in the TODO sections to create a working chatbot!
// HINT: Look at the examples in the lesson for guidance.

import OpenAI from 'openai';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// The messages array holds our conversation history
const messages = [
  { 
    role: 'system', 
    content: 'You are a quirky, enthusiastic coding mentor named CodeBot. You love JavaScript and use emojis. Keep responses concise.' 
  },
];

console.log('🤖 CodeBot: Hey there! I\'m CodeBot. Ask me anything about coding! (type "exit" to quit)\n');

function askQuestion() {
  rl.question('👤 You: ', async (input) => {
    // TODO 1: Check if user wants to exit
    // If input is "exit", say goodbye and close the interface


    // TODO 2: Add the user's message to the messages array
    // Remember: user messages have role: 'user'


    // TODO 3: Call the OpenAI API
    // Use model: 'gpt-4o-mini', pass the messages array, temperature: 0.7
    // Store the result in a variable called 'completion'


    // TODO 4: Get the assistant's response from completion.choices[0].message
    // Add it to the messages array so the bot remembers it!


    // TODO 5: Print the assistant's response
    // Also print token usage from completion.usage


    // TODO 6: Call askQuestion() again to keep the conversation going!

  });
}

// Start the conversation!
askQuestion();
