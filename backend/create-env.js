// Create the project-root .env from .env.example with a fresh random session secret.
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const projectRoot = path.join(__dirname, '..');
const templatePath = path.join(projectRoot, '.env.example');
const envPath = path.join(projectRoot, '.env');

if (fs.existsSync(envPath)) {
  console.error('.env already exists; refusing to overwrite it.');
  process.exit(1);
}
if (!fs.existsSync(templatePath)) {
  console.error('.env.example was not found in the project root.');
  process.exit(1);
}

const template = fs.readFileSync(templatePath, 'utf8');
if (!/^SESSION_SECRET=GENERATE_ON_SETUP$/m.test(template)) {
  console.error('.env.example does not contain the SESSION_SECRET setup marker.');
  process.exit(1);
}

const secret = crypto.randomBytes(48).toString('hex');
const contents = template.replace(/^SESSION_SECRET=GENERATE_ON_SETUP$/m, `SESSION_SECRET=${secret}`);
fs.writeFileSync(envPath, contents, { flag: 'wx' });
console.log('Created project-root .env with a fresh random SESSION_SECRET.');
console.log('Keep .env private; it is ignored by Git.');
