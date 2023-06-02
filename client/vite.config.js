import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from 'vite-plugin-env-compatible';
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'global': {},
  },
  plugins: [react(), tailwindcss(), envCompatible({ prefix: 'REACT_APP' }), 
],
build: {
  rollupOptions: {
    external: ['@sentry/browser', '@sentry/utils', '@amplitude/analytics-client-common', 'sockjs-client'],
  },
  // 또는 esbuild 외부로 설정
  esbuild: {
    external: ['@sentry/browser', '@sentry/utils', '@amplitude/analytics-client-common', 'sockjs-client']
  },
},
})

