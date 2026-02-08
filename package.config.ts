import { defineConfig } from '@sanity/pkg-utils';

export default defineConfig({
  dist: 'dist',
  tsconfig: 'tsconfig.dist.json',

  // Remove this block to enable strict export validation
  extract: {
    rules: {
      'ae-forgotten-export': undefined,
      'ae-incompatible-release-tags': undefined,
      'ae-internal-missing-underscore': undefined,
      'ae-missing-release-tag': undefined,
    },
  },
  rollup: {
    plugins: [],
  },
});
