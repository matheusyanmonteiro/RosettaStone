import { render, screen } from '@testing-library/react';
import BackButton from '@/components/BackButton';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('BackButton', () => {
  it('renders the label text', () => {
    render(<BackButton href="/en" label="BACK_HOME" />);
    expect(screen.getByText(/BACK_HOME/)).toBeInTheDocument();
  });

  it('renders the correct href', () => {
    render(<BackButton href="/en/blog" label="BACK_TO_BLOG" />);
    const link = screen.getByText(/BACK_TO_BLOG/).closest('a');
    expect(link).toHaveAttribute('href', '/en/blog');
  });

  it('renders a link with the chevron prefix', () => {
    render(<BackButton href="/" label="ROOT" />);
    expect(screen.getByText(/ROOT/)).toBeInTheDocument();
  });
});
