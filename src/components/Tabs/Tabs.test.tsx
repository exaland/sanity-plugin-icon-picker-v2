import userEvent from '@testing-library/user-event';

import { render } from '../../../test/utils';
import { OptionsProvider } from '../../hooks/useOptions';
import { TabList, TabPanel, Tabs } from '.';
import type { ReactElement, ReactNode } from 'react';

const tabsRender = (ui: ReactElement) =>
  render(ui, {
    wrapper: ({ children }: { children: ReactNode }) => (
      <OptionsProvider>
        <Tabs>{children}</Tabs>
      </OptionsProvider>
    ),
  });

describe('TabList', () => {
  it('renders two tabs with correct titles', () => {
    const { getByRole, getAllByRole } = tabsRender(
      <TabList providers={['f7', 'sa', 'lu']} />,
    );

    expect(getAllByRole('tab').length).toBe(3);
    expect(getByRole('tab', { name: /Framework7/i })).toBeDefined();
    expect(getByRole('tab', { name: /Sanity Icons/i })).toBeDefined();
    expect(getByRole('tab', { name: /Lucide Icons/i })).toBeDefined();
  });
});

describe('TabPanel', () => {
  it('renders a heading title based on the provider', () => {
    const { getByText } = tabsRender(
      <TabPanel provider="f7">
        <div>Child 1</div>
      </TabPanel>,
    );

    expect(getByText('Framework7')).toBeDefined();
  });
  it('renders the content provided as child', () => {
    const { getByText } = tabsRender(
      <TabPanel provider="f7">
        <div>Child 1</div>
      </TabPanel>,
    );

    expect(getByText('Child 1')).toBeDefined();
  });
});

describe('Tabs', () => {
  it('renders children correctly', () => {
    const { getByText } = tabsRender(
      <>
        <div>Child 1</div>
        <div>Child 2</div>
      </>,
    );

    expect(getByText('Child 1')).toBeDefined();
    expect(getByText('Child 2')).toBeDefined();
  });

  it('displays the correct tab-panel based on the initially selected list-tab', () => {
    const mockProviders = ['all-icons', 'f7', 'sa'];

    const { container } = tabsRender(
      <>
        <TabList providers={mockProviders} />
        <>
          {mockProviders.map((provider) => (
            <TabPanel key={provider} provider={provider}>
              <div>{`${provider}-content`}</div>
            </TabPanel>
          ))}
        </>
      </>,
    );

    const allIconsPanel = container.querySelector('#all-icons-panel');
    const f7Panel = container.querySelector('#f7-panel');
    const saPanel = container.querySelector('#sa-panel');

    expect(allIconsPanel).toHaveProperty('hidden', false);
    expect(f7Panel).toHaveProperty('hidden', true);
    expect(saPanel).toHaveProperty('hidden', true);
  });
  it('displays and hides the correct tab-panels based on the selected list-tab', async () => {
    const user = userEvent.setup();
    const mockProviders = ['all-icons', 'f7', 'sa'];

    const { container, getByRole } = tabsRender(
      <>
        <TabList providers={mockProviders} />
        <>
          {mockProviders.map((provider) => (
            <TabPanel key={provider} provider={provider}>
              <div>{`${provider}-content`}</div>
            </TabPanel>
          ))}
        </>
      </>,
    );

    const allIconsTab = getByRole('tab', { name: /All Icons/i });
    const f7Tab = getByRole('tab', { name: /Framework7/i });
    const saTab = getByRole('tab', { name: /Sanity Icons/i });

    const allIconsPanel = container.querySelector('#all-icons-panel');
    const f7Panel = container.querySelector('#f7-panel');
    const saPanel = container.querySelector('#sa-panel');

    expect(allIconsPanel).toHaveProperty('hidden', false);
    expect(f7Panel).toHaveProperty('hidden', true);
    expect(saPanel).toHaveProperty('hidden', true);

    await user.click(f7Tab);
    expect(allIconsPanel).toHaveProperty('hidden', true);
    expect(f7Panel).toHaveProperty('hidden', false);
    expect(saPanel).toHaveProperty('hidden', true);

    await user.click(saTab);
    expect(allIconsPanel).toHaveProperty('hidden', true);
    expect(f7Panel).toHaveProperty('hidden', true);
    expect(saPanel).toHaveProperty('hidden', false);

    await user.click(allIconsTab);
    expect(allIconsPanel).toHaveProperty('hidden', false);
    expect(f7Panel).toHaveProperty('hidden', true);
    expect(saPanel).toHaveProperty('hidden', true);
  });
});
