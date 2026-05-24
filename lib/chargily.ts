import { ChargilyClient } from '@chargily/chargily-pay';

export const chargilyClient = new ChargilyClient({
  api_key: process.env.CHARGILY_API_KEY!,
  mode: 'test', // 'test' for now, change to 'live' later
});
