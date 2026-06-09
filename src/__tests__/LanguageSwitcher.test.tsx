import { render, screen } from '@testing-library/react';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  usePathname: () => '/pt/projects',
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('LanguageSwitcher', () => {
  it('renders both language links', () => {
    render(<LanguageSwitcher />);
    expect(screen.getByText('[ PT-BR ]')).toBeInTheDocument();
    expect(screen.getByText('[ EN-US ]')).toBeInTheDocument();
  });

  it('highlights the current locale', () => {
    render(<LanguageSwitcher />);
    const ptLink = screen.getByText('[ PT-BR ]');
    expect(ptLink.closest('a')).toHaveAttribute('href', '/pt/projects');
  });

  it('links to the correct locale path', () => {
    render(<LanguageSwitcher />);
    const enLink = screen.getByText('[ EN-US ]');
    expect(enLink.closest('a')).toHaveAttribute('href', '/en/projects');
  });
});
