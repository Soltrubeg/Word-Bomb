import fs from 'fs';
import readline from 'readline';

export async function GET() {
  return new Response(
    await new Promise((resolve) => {
      const words = [];
      const readStream = fs.createReadStream('./public/words.txt', 'utf-8');
      const rl = readline.createInterface({ input: readStream });

      rl.on('line', (line) => words.push(line));
      rl.on('close', () => resolve(JSON.stringify(words)));
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
