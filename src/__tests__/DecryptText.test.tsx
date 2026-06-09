import { render, screen, fireEvent } from '@testing-library/react';
import DecryptText from '@/components/DecryptText';

describe('DecryptText', () => {
  it('renders the provided text', () => {
    render(<DecryptText text="HELLO_WORLD" />);
    expect(screen.getByText('HELLO_WORLD')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<DecryptText text="TEST" className="text-red-500" />);
    const span = screen.getByText('TEST');
    expect(span.className).toContain('text-red-500');
  });

  it('responds to hover events', () => {
    render(<DecryptText text="DATA" />);
    const span = screen.getByText('DATA');

    fireEvent.mouseEnter(span);
    fireEvent.mouseLeave(span);

    expect(screen.getByText('DATA')).toBeInTheDocument();
  });
});
