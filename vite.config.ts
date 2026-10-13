import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  // Yalnızca bu iki değer tarayıcı koduna girer; Vercel'deki diğer SUPABASE_* gizli değerleri girmez.
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env }
  const pick = (name: string) => JSON.stringify((env[name] ?? env[`VITE_${name}`] ?? '').trim())

  return {
    plugins: [vue(), tailwindcss()],
    resolve: {
      alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
    },
    define: {
      'import.meta.env.SUPABASE_URL': pick('SUPABASE_URL'),
      'import.meta.env.SUPABASE_PUBLISHABLE_KEY': pick('SUPABASE_PUBLISHABLE_KEY'),
    },
    ssgOptions: {
      dirStyle: 'nested',
      formatting: 'minify',
      script: 'async',
    },
  }
})
