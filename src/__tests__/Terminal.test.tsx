import { render, screen, fireEvent } from '@testing-library/react';
import Terminal from '@/components/Terminal';

const mockToggleTheme = vi.fn();
const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

vi.mock('@/context/ThemeContext', () => ({
  useTheme: () => ({ toggleTheme: mockToggleTheme }),
}));

Element.prototype.scrollIntoView = vi.fn();

const mockDict = {
  about: {
    description: 'Software Engineer with data focus',
  },
};

describe('Terminal', () => {
  beforeEach(() => {
    mockToggleTheme.mockClear();
    mockPush.mockClear();
  });

  it('renders with default history', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    expect(screen.getByText('SYSTEM_INIT: SUCCESSFUL')).toBeInTheDocument();
    expect(screen.getByText("TYPE 'HELP' FOR COMMANDS")).toBeInTheDocument();
  });

  it('responds to help command', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    const input = screen.getByPlaceholderText('ENTER_COMMAND...');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'help' } });
    fireEvent.submit(form);

    expect(screen.getByText('AVAILABLE: ABOUT, THEME, CLEAR, BLOG')).toBeInTheDocument();
  });

  it('responds to blog command', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    const input = screen.getByPlaceholderText('ENTER_COMMAND...');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'blog' } });
    fireEvent.submit(form);

    expect(screen.getByText('REDIRECTING_TO_BLOG...')).toBeInTheDocument();
    expect(mockPush).toHaveBeenCalledWith('/en/blog');
  });

  it('responds to about command with dictionary description', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    const input = screen.getByPlaceholderText('ENTER_COMMAND...');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'about' } });
    fireEvent.submit(form);

    expect(screen.getByText('Software Engineer with data focus')).toBeInTheDocument();
  });

  it('responds to theme command', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    const input = screen.getByPlaceholderText('ENTER_COMMAND...');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'theme' } });
    fireEvent.submit(form);

    expect(screen.getByText('SYSTEM_THEME_TOGGLED')).toBeInTheDocument();
    expect(mockToggleTheme).toHaveBeenCalledTimes(1);
  });

  it('clears history on clear command', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    const input = screen.getByPlaceholderText('ENTER_COMMAND...');
    const form = input.closest('form')!;

    expect(screen.getByText('SYSTEM_INIT: SUCCESSFUL')).toBeInTheDocument();

    fireEvent.change(input, { target: { value: 'clear' } });
    fireEvent.submit(form);

    expect(screen.queryByText('SYSTEM_INIT: SUCCESSFUL')).not.toBeInTheDocument();
  });

  it('shows error for unknown command', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    const input = screen.getByPlaceholderText('ENTER_COMMAND...');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'unknown' } });
    fireEvent.submit(form);

    expect(screen.getByText('COMMAND_NOT_FOUND: unknown')).toBeInTheDocument();
  });

  it('handles case-insensitive commands', () => {
    render(<Terminal dict={mockDict} lang="en" />);
    const input = screen.getByPlaceholderText('ENTER_COMMAND...');
    const form = input.closest('form')!;

    fireEvent.change(input, { target: { value: 'HELP' } });
    fireEvent.submit(form);

    expect(screen.getByText('AVAILABLE: ABOUT, THEME, CLEAR, BLOG')).toBeInTheDocument();
  });
});
