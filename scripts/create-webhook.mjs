import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, '..', '.env');

const envRaw = readFileSync(envPath, 'utf8');

function env(name) {
  const match = envRaw.match(new RegExp(`^${name}=(.+)`, 'm'));
  return match ? match[1].trim() : '';
}

const projectId = env('SANITY_PROJECT_ID') || '64qdsz2b';
const secret = env('SANITY_WEBHOOK_SECRET');
const token = process.argv[2];

if (!token) {
  console.error('Usage: node scripts/create-webhook.mjs <management-token>');
  console.error('');
  console.error('Get your management token from:');
  console.error('  npx sanity debug --secrets  | findstr "Auth token"');
  process.exit(1);
}

if (!secret) {
  console.error('SANITY_WEBHOOK_SECRET not found in .env');
  process.exit(1);
}

const payload = {
  type: 'document',
  name: 'Send Newsletter',
  url: 'https://brickwire.com/api/send-newsletter',
  dataset: 'production',
  description: 'Triggered when a newsletter is published — sends daily briefs via Resend to all active Supabase subscribers.',
  apiVersion: 'v2025-02-19',
  httpMethod: 'POST',
  secret: secret,
  rule: {
    on: ['create', 'update'],
    filter: "_type == 'newsletter'",
  },
  includeDrafts: false,
  isDisabledByUser: false,
};

console.log('Creating webhook...');
console.log(`  URL:  ${payload.url}`);
console.log(`  Rule: ${payload.rule.filter}`);
console.log(`  Project: ${projectId}`);

try {
  const response = await fetch(
    `https://${projectId}.api.sanity.io/v2025-02-19/hooks/projects/${projectId}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    }
  );

  const text = await response.text();
  console.log(`Status: ${response.status}`);

  if (response.ok) {
    const data = JSON.parse(text);
    console.log('Webhook created successfully!');
    console.log(`  ID:   ${data.id}`);
    console.log(`  Name: ${data.name}`);
  } else {
    console.error(`Error: ${text}`);
    process.exit(1);
  }
} catch (err) {
  console.error(`Failed: ${err.message}`);
  process.exit(1);
}
