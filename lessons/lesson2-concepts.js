// ============================================================
// Lesson 2: Prompt Engineering — Concept Playground
// ============================================================
// Run each section independently to see how different prompts
// produce different results. Comment/uncomment sections to test!

import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function chat(model, messages, temperature = 0.7) {
  const completion = await openai.chat.completions.create({
    model,
    messages,
    temperature,
    max_tokens: 500,
  });
  return {
    content: completion.choices[0].message.content,
    usage: completion.usage,
  };
}

// ==========================================
// EXAMPLE 1: Role Prompting
// ==========================================
// Same question, different personalities = different answers
async function demoRolePrompting() {
  console.log('\n🎭 === EXAMPLE 1: Role Prompting ===\n');
  
  const question = 'Explain what a closure is in JavaScript.';
  
  const roles = [
    { name: 'Beginner Teacher', prompt: 'You are a teacher explaining to a 12-year-old. Use simple analogies.' },
    { name: 'Senior Engineer', prompt: 'You are a senior engineer in a code review. Be technical and concise.' },
    { name: 'Poet', prompt: 'You are a poet. Explain programming concepts through beautiful metaphors.' },
  ];
  
  for (const role of roles) {
    const result = await chat('gpt-4o-mini', [
      { role: 'system', content: role.prompt },
      { role: 'user', content: question },
    ], 0.7);
    
    console.log(`\n👤 ${role.name}:`);
    console.log(result.content);
  }
}

// ==========================================
// EXAMPLE 2: Few-Shot Prompting
// ==========================================
// Show examples to teach a pattern
async function demoFewShotPrompting() {
  console.log('\n📝 === EXAMPLE 2: Few-Shot Prompting ===\n');
  
  const prompt = `Convert descriptions to fun, alliterative restaurant names.

Description: A burger joint with spicy food
Name: Blazin' Burgers

Description: A cozy coffee shop with books
Name: Brewed Books Cafe

Description: A sushi place with neon lights
Name: Neon Nigiri

Description: A vegan cafe with garden seating
Name:`;

  const result = await chat('gpt-4o-mini', [
    { role: 'user', content: prompt },
  ], 0.7);
  
  console.log('Input: A vegan cafe with garden seating');
  console.log(`Output: ${result.content.trim()}`);
}

// ==========================================
// EXAMPLE 3: Chain-of-Thought
// ==========================================
// Force the LLM to think step by step
async function demoChainOfThought() {
  console.log('\n🧠 === EXAMPLE 3: Chain-of-Thought ===\n');
  
  // Without chain-of-thought
  const simplePrompt = 'Roger has 5 tennis balls. He buys 2 cans of tennis balls. Each can has 3 balls. How many does he have now?';
  
  const simpleResult = await chat('gpt-4o-mini', [
    { role: 'user', content: simplePrompt },
  ], 0.0);
  
  console.log('❌ Without CoT:', simpleResult.content);
  
  // With chain-of-thought
  const cotPrompt = `${simplePrompt}

Let's work through this step by step:
Step 1: Count what Roger starts with.
Step 2: Calculate how many balls he bought.
Step 3: Add them together.
Step 4: State the final answer.`;
  
  const cotResult = await chat('gpt-4o-mini', [
    { role: 'user', content: cotPrompt },
  ], 0.0);
  
  console.log('✅ With CoT:', cotResult.content);
}

// ==========================================
// EXAMPLE 4: Temperature Comparison
// ==========================================
// Same prompt, different temperatures
async function demoTemperature() {
  console.log('\n🌡️ === EXAMPLE 4: Temperature ===\n');
  
  const prompt = 'Give me a creative name for a JavaScript meetup group. Just the name, nothing else.';
  
  for (const temp of [0.0, 0.5, 1.0, 1.5]) {
    const result = await chat('gpt-4o-mini', [
      { role: 'user', content: prompt },
    ], temp);
    
    console.log(`Temperature ${temp}: "${result.content.trim()}"`);
  }
}

// ==========================================
// Run the demos!
// ==========================================
// Comment out the ones you don't want to run

await demoRolePrompting();
await demoFewShotPrompting();
await demoChainOfThought();
await demoTemperature();

console.log('\n✅ All demos complete!');
