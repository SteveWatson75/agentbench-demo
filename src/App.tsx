import { useMemo, useState } from 'react';
import { evaluateCases } from './evaluator';
import { sampleCases, sampleResponses } from './sample-data';
import './App.css';

function App() {
  const [responses, setResponses] =
    useState<Record<string, string>>(sampleResponses);

  const results = useMemo(
    () => evaluateCases(sampleCases, responses),
    [responses],
  );

  const handleResponseChange = (caseId: string, response: string) => {
    setResponses((current) => ({ ...current, [caseId]: response }));
  };

  const passCount = results.filter((r) => r.passed).length;

  return (
    <main className="app">
      <header>
        <h1>AgentBench</h1>
        <p>
          Deterministic evaluation of agent responses against defined rules.
        </p>
        <p className="summary">
          {passCount} / {results.length} sample cases passed
        </p>
      </header>

      <section className="results">
        {results.map((result) => (
          <article
            key={result.caseId}
            className={`result-card ${result.passed ? 'pass' : 'fail'}`}
          >
            <div className="result-header">
              <h2>{result.caseName}</h2>
              <span className="badge">{result.passed ? 'PASS' : 'FAIL'}</span>
            </div>
            <div className="result-body">
              <p>
                <strong>Input:</strong> {result.caseId}
              </p>
              <label
                className="response-label"
                htmlFor={`response-${result.caseId}`}
              >
                Response
              </label>
              <textarea
                id={`response-${result.caseId}`}
                className="response-input"
                value={responses[result.caseId] ?? ''}
                onChange={(event) =>
                  handleResponseChange(result.caseId, event.target.value)
                }
              />
              <ul className="rule-list">
                {result.ruleResults.map((rule) => (
                  <li
                    key={rule.ruleId}
                    className={`rule-item ${rule.passed ? 'pass' : 'fail'}`}
                  >
                    <span className="rule-status">
                      {rule.passed ? '✓' : '✗'}
                    </span>
                    <span className="rule-text">
                      <strong>{rule.description}</strong>
                      <br />
                      <em>{rule.explanation}</em>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
