import { render, screen, renderHook, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/context/ThemeContext';
import { ReactNode } from 'react';

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

function renderUseTheme() {
  return renderHook(() => useTheme(), {
    wrapper: ({ children }: { children: ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    ),
  });
}

describe('ThemeContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  it('defaults to neuromancer theme', () => {
    const { result } = renderUseTheme();
    expect(result.current.theme).toBe('neuromancer');
  });

  it('toggles between neuromancer and matrix', () => {
    const { result } = renderUseTheme();

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('matrix');

    act(() => {
      result.current.toggleTheme();
    });

    expect(result.current.theme).toBe('neuromancer');
  });

  it('throws error when useTheme is used outside provider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used within ThemeProvider'
    );
  });
});
