import type { McpServer } from '@modelcontextprotocol/server';
import { toStandardJsonSchema } from '@valibot/to-json-schema';
import * as v from 'valibot';

export function initEchoTool(server: McpServer) {
	return server.registerTool(
		'echo',
		{
			description: 'Echo the input unchanged.',
			inputSchema: toStandardJsonSchema(v.strictObject({ input: v.string() })),
		},
		({ input }) => ({ content: [{ type: 'text', text: input }] }),
	);
}
