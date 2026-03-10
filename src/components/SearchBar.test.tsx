import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import type { ChangeEvent } from 'react';

import { render } from '../../test/utils';
import SearchBar from './SearchBar';
import { vi } from 'vitest';

function renderControlledComponent(props: { value: string }) {
  const mockOnChange = vi.fn<(e: ChangeEvent<HTMLInputElement>) => void>();

  function TestEnvironment() {
    const [value, setValue] = useState(props.value);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      mockOnChange(e);
    };

    return <SearchBar value={value} onChange={handleChange} />;
  }

  return {
    ...render(<TestEnvironment />),
    mockOnChange,
  };
}

describe('SearchBar', () => {
  const INITIAL_VALUE = 'test123';
  const mockOnChangeHandler = vi.fn();

  it('renders correctly', () => {
    const { getByPlaceholderText } = render(
      <SearchBar value="" onChange={mockOnChangeHandler} />,
    );
    expect(getByPlaceholderText('Search Icons')).toBeDefined();
  });

  it('renders value prop', () => {
    const { getByDisplayValue } = render(
      <SearchBar value="test value" onChange={mockOnChangeHandler} />,
    );
    expect(getByDisplayValue('test value')).toBeDefined();
  });

  it('calls onChange successfully', async () => {
    const value = 'user123';
    const user = userEvent.setup();
    const { mockOnChange, getByPlaceholderText } = renderControlledComponent({
      value: INITIAL_VALUE,
    });

    const input = getByPlaceholderText('Search Icons');

    await user.clear(input);
    await user.type(input, value);

    expect(mockOnChange).toHaveBeenCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value,
        }),
      }),
    );
  });
});
