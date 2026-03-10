import { Box, Container } from '@sanity/ui';
import type { ReactNode } from 'react';
import { TabsProvider } from './useTabs';

export const Tabs = ({ children }: { children: ReactNode }) => {
  return (
    <TabsProvider>
      <Container>
        <Box marginTop={4}>{children}</Box>
      </Container>
    </TabsProvider>
  );
};
