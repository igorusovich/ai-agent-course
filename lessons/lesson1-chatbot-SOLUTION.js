// ============================================================
// Lesson 1: CLI Chatbot — SOLUTION
// ============================================================
// This is the completed version. Try to solve it yourself first!

import OpenAI from 'openai';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const messages = [
  { 
    role: 'system', 
    content: 'You are a quirky, enthusiastic coding mentor named CodeBot. You love JavaScript and use emojis. Keep responses concise.' 
  },
];

console.log('🤖 CodeBot: Hey there! I\'m CodeBot. Ask me anything about coding! (type "exit" to quit)\n');

function askQuestion() {
  rl.question('👤 You: ', async (input) => {
    // Handle exit
    if (input.toLowerCase() === 'exit') {
      console.log('🤖 CodeBot: Happy coding! 👋');
      rl.close();
      return;
    }

    // Add user message to history
    messages.push({ role: 'user', content: input });

    try {
      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      });

      // Get assistant's response
      const assistantMessage = completion.choices[0].message;
      
      // Add to history so bot remembers!
      messages.push(assistantMessage);

      // Print response
      console.log(`🤖 CodeBot: ${assistantMessage.content}\n`);
      
      // Print token usage
      const usage = completion.usage;
      console.log(`📊 Tokens used: ${usage.prompt_tokens} in + ${usage.completion_tokens} out = ${usage.total_tokens} total\n`);

    } catch (error) {
      console.error('❌ Oops, something went wrong:', error.message);
    }

    // Ask next question (keeps the loop going)
    askQuestion();
  });
}

askQuestion();
