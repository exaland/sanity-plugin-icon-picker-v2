import userEvent from '@testing-library/user-event';

import { render } from '../../test/utils';
import Popup from './Popup';
import { vi } from 'vitest';

describe('Popup', () => {
  const mockOnClose = vi.fn();

  it('renders correctly when isOpen is true', () => {
    const { getByText } = render(
      <Popup onClose={mockOnClose} isOpen>
        <div>Test content</div>
      </Popup>,
    );
    expect(getByText('Test content')).toBeDefined();
  });

  it('does not render when isOpen is false', () => {
    const { queryByText } = render(
      <Popup onClose={mockOnClose} isOpen={false}>
        <div>Test content</div>
      </Popup>,
    );
    expect(queryByText('Test content')).toBeNull();
  });

  it('calls onClose when Dialog onClose is triggered', async () => {
    const user = userEvent.setup();
    const { getByRole } = render(
      <Popup onClose={mockOnClose} isOpen>
        <div>Test content</div>
      </Popup>,
    );
    await user.click(getByRole('button'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});
