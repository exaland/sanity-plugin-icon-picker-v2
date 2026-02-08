// eslint-disable-next-line import/no-unresolved
import '@testing-library/jest-dom/extend-expect';

import { setupGlobalMatchMedia, setupGlobalResizeObserver } from './test/mocks';

setupGlobalMatchMedia();
setupGlobalResizeObserver();
