import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { act } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import App from './App';

let container: HTMLDivElement;
let root: Root;

function getCards(): HTMLElement[] {
  return Array.from(container.querySelectorAll<HTMLElement>('.result-card'));
}

function getCard(caseName: string): HTMLElement {
  const card = getCards().find(
    (candidate) => candidate.querySelector('h2')?.textContent === caseName,
  );
  if (!card) {
    throw new Error(`Could not find result card for "${caseName}"`);
  }
  return card;
}

function getTextarea(caseName: string): HTMLTextAreaElement {
  const textarea = getCard(caseName).querySelector('textarea');
  if (!textarea) {
    throw new Error(`Could not find textarea for "${caseName}"`);
  }
  return textarea;
}

function editResponse(caseName: string, response: string) {
  const textarea = getTextarea(caseName);
  const setValue = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    'value',
  )?.set;
  if (!setValue) {
    throw new Error('Could not set textarea value');
  }

  act(() => {
    setValue.call(textarea, response);
    textarea.dispatchEvent(new Event('input', { bubbles: true }));
  });
}

beforeEach(() => {
  (
    globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }
  ).IS_REACT_ACT_ENVIRONMENT = true;
  container = document.createElement('div');
  document.body.appendChild(container);
  root = createRoot(container);
  act(() => {
    root.render(<App />);
  });
});

afterEach(() => {
  act(() => {
    root.unmount();
  });
  container.remove();
});

describe('App', () => {
  it('renders every sample case with an editable response', () => {
    expect(getCards().map((card) => card.querySelector('h2')?.textContent)).toEqual([
      'Capital of France',
      'Hello world',
      'Email format',
      'No spoiler',
    ]);
    expect(container.querySelector('.summary')?.textContent).toContain(
      '4 / 4 sample cases passed',
    );
    expect(getTextarea('Hello world').value).toBe('hello world');
  });

  it('re-evaluates a case when its response is edited', () => {
    editResponse('Hello world', 'hello there');

    expect(getCard('Hello world').classList.contains('fail')).toBe(true);
    expect(getCard('Hello world').querySelector('.badge')?.textContent).toBe(
      'FAIL',
    );
    expect(container.querySelector('.summary')?.textContent).toContain(
      '3 / 4 sample cases passed',
    );
  });

  it('keeps each case response independent', () => {
    editResponse('Hello world', 'goodbye');

    expect(getTextarea('Hello world').value).toBe('goodbye');
    expect(getTextarea('Capital of France').value).toBe(
      'The capital of France is Paris.',
    );
    expect(getCard('Capital of France').classList.contains('pass')).toBe(true);
  });

  it('evaluates an empty string when a response is cleared', () => {
    editResponse('Capital of France', '');

    expect(getTextarea('Capital of France').value).toBe('');
    expect(getCard('Capital of France').classList.contains('fail')).toBe(true);
  });
});
