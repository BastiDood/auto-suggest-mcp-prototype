import { McpServer } from '@modelcontextprotocol/server';
import { StdioServerTransport } from '@modelcontextprotocol/server/stdio';

import { initEchoTool } from './tools/echo';

const server = new McpServer({ name: 'auto-suggest', version: '0.1.0' });

initEchoTool(server);

await server.connect(new StdioServerTransport());
