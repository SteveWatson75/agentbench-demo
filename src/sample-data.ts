import type { EvaluationCase } from './types';

export const sampleCases: EvaluationCase[] = [
  {
    id: 'capital-of-france',
    name: 'Capital of France',
    input: 'What is the capital of France?',
    expectedOutcome: 'Paris',
    rules: [
      {
        id: 'contains-paris',
        description: 'Response must include "Paris"',
        operator: 'contains',
        target: 'Paris',
      },
    ],
  },
  {
    id: 'hello-world',
    name: 'Hello world',
    input: 'Say "hello world".',
    expectedOutcome: 'hello world',
    rules: [
      {
        id: 'exact-hello',
        description: 'Response must be exactly "hello world"',
        operator: 'exact',
        target: 'hello world',
      },
    ],
  },
  {
    id: 'email-format',
    name: 'Email format',
    input: 'Give me a support email address.',
    expectedOutcome: 'A valid-looking email address.',
    rules: [
      {
        id: 'email-pattern',
        description: 'Response must contain an email-like pattern',
        operator: 'regex',
        target: '\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b',
      },
    ],
  },
  {
    id: 'no-spoiler',
    name: 'No spoiler',
    input: 'Summarise the movie without spoilers.',
    expectedOutcome: 'A summary that does not reveal the ending.',
    rules: [
      {
        id: 'no-ending',
        description: 'Response must not contain the word "ending"',
        operator: 'contains',
        target: 'ending',
        negate: true,
      },
    ],
  },
];

export const sampleResponses: Record<string, string> = {
  'capital-of-france': 'The capital of France is Paris.',
  'hello-world': 'hello world',
  'email-format': 'Contact support@example.com for help.',
  'no-spoiler': 'It is a tense thriller about a missing person.',
};
