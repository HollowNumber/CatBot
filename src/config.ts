import { getBotIdFromToken, Intents } from '../deps.ts';
import { load } from '../dev_deps.ts';

const env = await load();

/** Consts */
export const BOT_ID = getBotIdFromToken(env['DISCORD_API_TOKEN'] as string);
export const BOT_TOKEN = env['DISCORD_API_TOKEN'] as string;
export const INTENTS: Intents = Intents.DirectMessageReactions |
  Intents.DirectMessageTyping |
  Intents.DirectMessages |
  Intents.GuildBans |
  Intents.GuildEmojis |
  Intents.GuildIntegrations |
  Intents.GuildInvites |
  Intents.GuildMembers |
  Intents.GuildMessageReactions |
  Intents.GuildMessageTyping |
  Intents.GuildMessages |
  Intents.GuildPresences |
  Intents.GuildVoiceStates |
  Intents.GuildWebhooks |
  Intents.Guilds;
