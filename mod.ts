#! /usr/bin/env -S deno run --allow-env --allow-read --allow-net --unstable
/** Discord */
import {
  ActivityTypes,
  createBot,
  enableCachePlugin,
  enableCacheSweepers,
  fastFileLoader,
  GatewayIntents,
  startBot,
} from './deps.ts';

/** Config */
import { BOT_ID, BOT_TOKEN, INTENTS } from './src/config.ts';

/** events */
import { events } from './src/events/mod.ts';

/** utils */
import { logger } from './src/util/logger.ts';
import { updateCommands } from './src/util/helpers.ts';

const log = logger({ name: 'Main' });

const paths = ['./src/events', './src/commands'];
await fastFileLoader(paths).catch((err) => {
  log.fatal(`Unable to Import ${paths}`);
  log.fatal(err);
  Deno.exit(1);
});

export const bot = enableCachePlugin(
  createBot({
    token: BOT_TOKEN,
    botId: BOT_ID,
    intents: GatewayIntents.Guilds,
    events,
  }),
);

// @ts-nocheck: no-updated-depencdencies
enableCacheSweepers(bot);

bot.gateway.manager.createShardOptions.makePresence = (shardId: number) => {
  return {
    shardId,
    status: 'online',
    activities: [
      {
        name: 'Watching Lidl for any changes',
        type: ActivityTypes.Game,
        createdAt: Date.now(),
      },
    ],
  };
};

await startBot(bot);

await updateCommands(bot);
