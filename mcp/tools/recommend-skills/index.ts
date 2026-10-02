import type { McpServer } from '@modelcontextprotocol/server';
import type { TypeSafeClient } from '@typesafe-ai/sdk';
import { toStandardJsonSchema } from '@valibot/to-json-schema';
import * as v from 'valibot';

import { buildSkillRecommendations, SKILL_CHOICE } from './recommendation';

export function initRecommendSkillsTool(server: McpServer, client: TypeSafeClient) {
	return server.registerTool(
		'recommend_skills',
		{
			description: 'Suggest relevant sample law-firm agent skills for the submitted prompt.',
			inputSchema: toStandardJsonSchema(v.strictObject({ prompt: v.string() })),
		},
		async ({ prompt }, { mcpReq: { signal } }) => {
			const { answers } = await client.systemOne(
				{ state: { prompt }, questions: { skill: SKILL_CHOICE } },
				{ signal, timeout: 10_000, retry: { maxRetries: 0 } },
			);

			const recommendations = buildSkillRecommendations(answers.skill);
			return {
				content:
					typeof recommendations === 'string' ? [{ type: 'text', text: recommendations }] : [],
			};
		},
	);
}
