import type {
  EvaluationCase,
  EvaluationResult,
  EvaluationRule,
  RuleResult,
} from './types';

function checkRule(rule: EvaluationRule, response: string): RuleResult {
  let matched = false;
  let detail = '';

  switch (rule.operator) {
    case 'exact':
      matched = response === rule.target;
      detail = matched
        ? 'response matches expected value exactly'
        : 'response does not match expected value exactly';
      break;
    case 'contains':
      matched = response.includes(rule.target);
      detail = matched
        ? `response contains "${rule.target}"`
        : `response does not contain "${rule.target}"`;
      break;
    case 'regex': {
      let regex: RegExp;
      try {
        regex = new RegExp(rule.target, 'i');
      } catch {
        return {
          ruleId: rule.id,
          description: rule.description,
          passed: false,
          explanation: `rule "${rule.id}" has an invalid regex pattern`,
        };
      }
      matched = regex.test(response);
      detail = matched
        ? `response matches pattern /${rule.target}/i`
        : `response does not match pattern /${rule.target}/i`;
      break;
    }
    default: {
      const _exhaustive: never = rule.operator;
      void _exhaustive;
      return {
        ruleId: rule.id,
        description: rule.description,
        passed: false,
        explanation: `rule "${rule.id}" uses an unsupported operator`,
      };
    }
  }

  const passed = rule.negate ? !matched : matched;
  const explanation = rule.negate
    ? `${detail}${matched ? ' but negation requires it to be absent' : ''}`
    : detail;

  return {
    ruleId: rule.id,
    description: rule.description,
    passed,
    explanation,
  };
}

export function evaluateCase(
  evaluationCase: EvaluationCase,
  response: string,
): EvaluationResult {
  const ruleResults = evaluationCase.rules.map((rule) =>
    checkRule(rule, response),
  );
  const passed = ruleResults.every((result) => result.passed);

  return {
    caseId: evaluationCase.id,
    caseName: evaluationCase.name,
    response,
    passed,
    ruleResults,
  };
}

export function evaluateCases(
  cases: EvaluationCase[],
  responses: Record<string, string>,
): EvaluationResult[] {
  return cases.map((evaluationCase) => {
    const response = responses[evaluationCase.id];
    if (response === undefined) {
      return {
        caseId: evaluationCase.id,
        caseName: evaluationCase.name,
        response: '',
        passed: false,
        ruleResults: [
          {
            ruleId: 'missing-response',
            description: 'A response is provided for the case',
            passed: false,
            explanation: `no response supplied for case "${evaluationCase.id}"`,
          },
        ],
      };
    }
    return evaluateCase(evaluationCase, response);
  });
}
