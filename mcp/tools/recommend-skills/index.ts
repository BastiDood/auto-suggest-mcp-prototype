import type { McpServer } from '@modelcontextprotocol/server';
import type { TypeSafeClient } from '@typesafe-ai/sdk';
import { toStandardJsonSchema } from '@valibot/to-json-schema';
import * as v from 'valibot';

import { recommendSkill } from './recommendation';

export function initRecommendSkillsTool(server: McpServer, client: TypeSafeClient) {
	return server.registerTool(
		'recommend_skills',
		{
			description:
				'Suggest sample law-firm agent skills available for download from the company GitHub marketplace, separate from skills installed in the current harness.',
			inputSchema: toStandardJsonSchema(v.strictObject({ prompt: v.string() })),
		},
		async ({ prompt }, { mcpReq: { signal } }) => {
			const recommendation = await recommendSkill(client, prompt, signal);
			return {
				content:
					typeof recommendation === 'undefined' ? [] : [{ type: 'text', text: recommendation }],
			};
		},
	);
}
