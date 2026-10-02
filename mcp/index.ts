import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';
import { TypeSafeClient } from '@typesafe-ai/sdk';

import { initRecommendSkillsTool } from './tools/recommend-skills';

const client = new TypeSafeClient();
const server = new McpServer({ name: 'auto-suggest', version: '0.1.0' });

initRecommendSkillsTool(server, client);

await server.connect(new StdioServerTransport());
