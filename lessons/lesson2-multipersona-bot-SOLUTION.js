// ============================================================
// Lesson 2: Multi-Persona Bot — SOLUTION
// ============================================================
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
// Persona definitions — each with unique personality and temperature
// ==========================================
const personas = {
  coder: {
    name: 'CodeMaster',
    systemPrompt: `You are an expert software engineer with 15 years of experience.
You write clean, production-ready code. Always include practical code examples.
Explain the "why" behind your recommendations. Be concise but thorough.`,
    temperature: 0.2, // Low = precise, deterministic code
  },
  chef: {
    name: 'Chef Gourmet',
    systemPrompt: `You are a passionate Michelin-star chef who loves teaching home cooks.
Give detailed recipes with exact measurements and timings.
Include pro tips, substitution ideas, and plating suggestions.
Be warm, enthusiastic, and encouraging.`,
    temperature: 0.6, // Medium = creative but structured recipes
  },
  tutor: {
    name: 'Professor Wise',
    systemPrompt: `You are a patient, experienced teacher who explains complex topics simply.
Use analogies and real-world examples. Break concepts into small steps.
Ask rhetorical questions to engage the learner. Never talk down to anyone.`,
    temperature: 0.4, // Low-medium = clear and consistent explanations
  },
  default: {
    name: 'PolyBot',
    systemPrompt: `You are a friendly, helpful assistant. You can discuss any topic.
Be conversational, use emojis, and keep responses concise unless asked for detail.
If someone asks about coding, food, or learning, suggest switching to a persona with /coder, /chef, or /tutor.`,
    temperature: 0.7, // Medium = balanced, friendly chat
  },
};

let currentPersona = 'default';
const conversationHistory = [];

// ==========================================
// Handle persona switching commands
// ==========================================
function handleCommand(input) {
  const command = input.toLowerCase().trim();
  
  // Check if it's a persona switch command
  for (const key of Object.keys(personas)) {
    if (command === `/${key}`) {
      currentPersona = key;
      const p = personas[currentPersona];
      console.log(`\n🎭 Switched to ${p.name}! (temp: ${p.temperature})\n`);
      return true;
    }
  }
  
  return false;
}

// ==========================================
// Main chat loop
// ==========================================
function askQuestion() {
  const persona = personas[currentPersona];
  
  rl.question(`👤 [${persona.name}] You: `, async (input) => {
    // Handle exit
    if (input.toLowerCase() === 'exit') {
      console.log('👋 Goodbye!');
      rl.close();
      return;
    }

    // Check if it's a command
    if (handleCommand(input)) {
      askQuestion();
      return;
    }

    // Add user message to history
    conversationHistory.push({ role: 'user', content: input });

    try {
      // Build messages: system prompt + full conversation history
      const messages = [
        { role: 'system', content: persona.systemPrompt },
        ...conversationHistory,
      ];

      // Call API with persona-specific temperature
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: persona.temperature,
        max_tokens: 800,
      });

      const assistantMessage = completion.choices[0].message;
      
      // Add assistant response to history (so it remembers!)
      conversationHistory.push(assistantMessage);

      // Print response with persona name
      console.log(`\n🎭 ${persona.name}: ${assistantMessage.content}\n`);
      
      // Print token usage
      const u = completion.usage;
      console.log(`📊 Tokens: ${u.prompt_tokens} in + ${u.completion_tokens} out = ${u.total_tokens} total\n`);

    } catch (error) {
      console.error('❌ Error:', error.message);
    }

    // Keep the conversation going
    askQuestion();
  });
}

// ==========================================
// Start!
// ==========================================
console.log('╔══════════════════════════════════════════╗');
console.log('║        🎭 POLYBOT MULTI-PERSONA          ║');
console.log('╠══════════════════════════════════════════╣');
console.log('║  /coder  → Expert programmer (temp: 0.2) ║');
console.log('║  /chef   → Michelin chef (temp: 0.6)     ║');
console.log('║  /tutor  → Patient teacher (temp: 0.4)   ║');
console.log('║  /default→ Friendly bot (temp: 0.7)      ║');
console.log('╚══════════════════════════════════════════╝');
console.log('Type "exit" to quit.\n');

askQuestion();
