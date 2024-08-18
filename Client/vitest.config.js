import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
console.log('Loaded vitest config');
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setupTest.js',
  },
  esbuild: {
    loader: 'jsx',
    include: /(src)\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: { '.js': 'jsx' },
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad(
              { filter: /(src)\/.*\.js$/ },
              async (args) => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8'),
              })
            );
          },
        },
      ],
    },
  }
});