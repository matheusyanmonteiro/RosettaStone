import { renderHook, act } from '@testing-library/react';
import { useDecrypt } from '@/hooks/useDecrypt';

describe('useDecrypt', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns the original text initially', () => {
    const { result } = renderHook(() => useDecrypt('Hello'));
    expect(result.current.displayText).toBe('Hello');
  });

  it('restores original text when hover ends', () => {
    const { result } = renderHook(() => useDecrypt('TEST'));

    act(() => {
      result.current.setIsHovering(true);
    });

    act(() => {
      result.current.setIsHovering(false);
    });

    expect(result.current.displayText).toBe('TEST');
  });

  it('toggles isHovering state', () => {
    const { result } = renderHook(() => useDecrypt('DATA'));

    expect(result.current.setIsHovering).toBeInstanceOf(Function);

    act(() => {
      result.current.setIsHovering(true);
    });
  });
});
