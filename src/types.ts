export type RuleOperator = 'contains' | 'exact' | 'regex';

export interface EvaluationRule {
  id: string;
  description: string;
  operator: RuleOperator;
  /** The target value the rule checks against. */
  target: string;
  /** If true, the rule passes when the check fails. */
  negate?: boolean;
}

export interface EvaluationCase {
  id: string;
  name: string;
  input: string;
  expectedOutcome: string;
  rules: EvaluationRule[];
}

export interface RuleResult {
  ruleId: string;
  description: string;
  passed: boolean;
  explanation: string;
}

export interface EvaluationResult {
  caseId: string;
  caseName: string;
  response: string;
  passed: boolean;
  ruleResults: RuleResult[];
}
