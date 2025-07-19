import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  output: {
    distPath: {
      root: 'web',
    },
    copy: process.env.NODE_ENV === 'development' ? [{ from: './src/demo' }] : [],
  },
  performance: {
    prefetch: {
      type: 'all-assets',
    },
  },
  html: {
    title: 'BASSIN ~ ~ ~',
    favicon: './src/images/favicon.svg',
  },
  server: {
    htmlFallback: false,
    publicDir: {
      copyOnBuild: false,
    },
  },
});
