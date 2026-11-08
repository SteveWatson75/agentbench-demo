import { describe, expect, it } from 'vitest';
import { evaluateCase, evaluateCases } from './evaluator';
import type { EvaluationCase } from './types';

const exactCase: EvaluationCase = {
  id: 'exact-match',
  name: 'Exact match',
  input: 'What is 2 + 2?',
  expectedOutcome: '4',
  rules: [
    {
      id: 'answer',
      description: 'Answer must be exactly 4',
      operator: 'exact',
      target: '4',
    },
  ],
};

const containsCase: EvaluationCase = {
  id: 'contains-keyword',
  name: 'Contains keyword',
  input: 'Name a primary color.',
  expectedOutcome: 'The response names a primary color.',
  rules: [
    {
      id: 'color',
      description: 'Response must include "blue"',
      operator: 'contains',
      target: 'blue',
    },
  ],
};

const regexCase: EvaluationCase = {
  id: 'regex-format',
  name: 'Regex format',
  input: 'Provide an email address.',
  expectedOutcome: 'A valid-looking email address.',
  rules: [
    {
      id: 'email-pattern',
      description: 'Response contains an email-like pattern',
      operator: 'regex',
      target: '\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}\\b',
    },
  ],
};

const negationCase: EvaluationCase = {
  id: 'no-spoiler',
  name: 'No spoiler',
  input: 'Describe the movie without spoilers.',
  expectedOutcome: 'No mention of the ending.',
  rules: [
    {
      id: 'no-ending',
      description: 'Response must not mention the ending',
      operator: 'contains',
      target: 'ending',
      negate: true,
    },
  ],
};

describe('evaluateCase', () => {
  it('passes an exact match', () => {
    const result = evaluateCase(exactCase, '4');
    expect(result.passed).toBe(true);
    expect(result.ruleResults[0].passed).toBe(true);
  });

  it('fails an exact mismatch', () => {
    const result = evaluateCase(exactCase, '5');
    expect(result.passed).toBe(false);
    expect(result.ruleResults[0].explanation).toContain(
      'does not match expected value',
    );
  });

  it('passes a contains match', () => {
    const result = evaluateCase(containsCase, 'The sky is blue.');
    expect(result.passed).toBe(true);
  });

  it('fails a contains mismatch', () => {
    const result = evaluateCase(containsCase, 'The sky is green.');
    expect(result.passed).toBe(false);
  });

  it('passes a regex match', () => {
    const result = evaluateCase(regexCase, 'Contact me at test@example.com.');
    expect(result.passed).toBe(true);
  });

  it('fails a regex mismatch', () => {
    const result = evaluateCase(regexCase, 'No email here.');
    expect(result.passed).toBe(false);
  });

  it('passes a negated rule when the target is absent', () => {
    const result = evaluateCase(negationCase, 'It is an exciting story.');
    expect(result.passed).toBe(true);
  });

  it('fails a negated rule when the target is present', () => {
    const result = evaluateCase(negationCase, 'The ending was surprising.');
    expect(result.passed).toBe(false);
    expect(result.ruleResults[0].explanation).toContain('negation');
  });

  it('reports invalid regex as a failure', () => {
    const invalidRegexCase: EvaluationCase = {
      ...regexCase,
      rules: [
        {
          id: 'bad-pattern',
          description: 'Invalid regex',
          operator: 'regex',
          target: '(',
        },
      ],
    };
    const result = evaluateCase(invalidRegexCase, 'anything');
    expect(result.passed).toBe(false);
    expect(result.ruleResults[0].explanation).toContain('invalid regex');
  });
});

describe('evaluateCases', () => {
  it('evaluates multiple cases and reports missing responses', () => {
    const results = evaluateCases([exactCase, containsCase], {
      'exact-match': '4',
    });
    expect(results).toHaveLength(2);
    expect(results[0].passed).toBe(true);
    expect(results[1].passed).toBe(false);
    expect(results[1].ruleResults[0].ruleId).toBe('missing-response');
  });
});
