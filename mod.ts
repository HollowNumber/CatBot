#! /usr/bin/env -S deno run --allow-env --allow-read --allow-net --unstable
/** Discord */
import { createBot, Intents, startBot } from './deps.ts';

/** Dotenv */
import { load } from './deps.ts';

if (import.meta.main) {
  const env = await load();
  const TOKEN = env['DISCORD_API_TOKEN'];
  if (!TOKEN) {
    console.error('No token provided');
    Deno.exit(1);
  }

  const bot = createBot({
    token: TOKEN,
    intents: Intents.All,
    events: {
      ready() {
        console.log('Bot is ready!');
      },
    },
  });

  startBot(bot);
}
