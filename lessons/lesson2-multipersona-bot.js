// ============================================================
// Lesson 2: Multi-Persona Bot
// ============================================================
// TASK: Build a chatbot that switches between expert personas!
// Concepts: Role prompting, temperature control, command handling

import OpenAI from 'openai';
import readline from 'readline';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ==========================================
// TODO 1: Define your personas!
// ==========================================
// Create an object with 4 personas: coder, chef, tutor, default
// Each persona should have: name, systemPrompt, temperature
// HINT: Use different temperatures for different tasks!
// coder: low temp (0.2) for precise code
// chef: medium temp (0.6) for creative recipes  
// tutor: low-medium (0.4) for clear explanations
// default: medium (0.7) for general chat
const personas = {
  // FILL IN HERE
};

// Track current persona
let currentPersona = 'default';

// Store conversation history (persists across persona switches!)
const conversationHistory = [];

// ==========================================
// TODO 2: Handle persona switching
// ==========================================
// If the user types "/coder", "/chef", "/tutor", or "/default",
// switch the current persona and print a message
// Return true if a switch happened, false otherwise
function handleCommand(input) {
  // Your code here
}

// ==========================================
// TODO 3 & 4: Complete the chat loop
// ==========================================
function askQuestion() {
  rl.question(`👤 [${currentPersona}] You: `, async (input) => {
    // Handle exit
    if (input.toLowerCase() === 'exit') {
      console.log('👋 Goodbye!');
      rl.close();
      return;
    }

    // TODO: Check if input is a persona command
    // If it's a command, switch persona and ask next question
    // (No API call needed for commands!)


    // TODO: If not a command:
    // 1. Add user message to conversationHistory
    // 2. Build messages array with current persona's systemPrompt + history
    // 3. Call OpenAI API with current persona's temperature
    // 4. Print response with persona name (e.g., "🎭 CodeMaster: ...")
    // 5. Add assistant response to conversationHistory
    // 6. Call askQuestion() again

  });
}

console.log('🎭 PolyBot: I can be anyone you want!');
console.log('Commands: /coder, /chef, /tutor, /default');
console.log('Type "exit" to quit.\n');

askQuestion();
