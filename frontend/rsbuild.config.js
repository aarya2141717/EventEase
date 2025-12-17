// @ts-check
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// Bind dev server to localhost to avoid advertising a network URL
export default defineConfig({
  server: {
    host: 'localhost',
  },
  plugins: [pluginReact()],
});
