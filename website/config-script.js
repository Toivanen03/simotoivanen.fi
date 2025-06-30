import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  apiKey: process.env.VITE_NAVI_API_KEY,
  apiKeyHERE: process.env.VITE_NAVI_API_KEY_HERE
};

const content = `window.config = ${JSON.stringify(config, null, 2)};`;

const outputPath = path.join(
  "public/old-exercises/Maisemanavigaattori/javascript/config-script.js"
);

fs.writeFileSync(outputPath, content);
console.log(`✅ config-script.js generoitu polkuun ${outputPath}`);
