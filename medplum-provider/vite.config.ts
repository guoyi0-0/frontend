import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dns from 'dns';
import path from 'path';
import { copyFileSync, existsSync } from 'fs';


if (!existsSync('.env')) {
  copyFileSync('.env.defaults', '.env');
}

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: ['MEDPLUM_','RECAPTCHA_'],
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 3000,
  },
  publicDir: 'static',
  resolve: {
    alias: {
      '@mantine/core': path.resolve(__dirname, 'node_modules/@mantine/core'),
    '@mantine/notifications': path.resolve(__dirname, 'node_modules/@mantine/notifications'),
      '@medplum/core': path.resolve(__dirname, '../packages/core/src'),
      '@medplum/react': path.resolve(__dirname, '../packages/react/src'),
      '@medplum/react-hooks': path.resolve(__dirname, '../packages/react-hooks/src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    },
    sourcemap: true,
    terserOptions: {
      mangle: {
        keep_classnames: true,
        keep_fnames: true,
      },
      compress: {
        drop_console: true,
      },
      output: {
        comments: false,
      },
    },
    commonjsOptions: {
      include: /node_modules/,
    },
  },
  optimizeDeps: {
    include: ['@mantine/core', '@mantine/notifications'],
  },
});
