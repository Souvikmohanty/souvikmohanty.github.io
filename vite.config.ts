import fs from 'fs';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, type Plugin} from 'vite';

function showcaseDownloadPlugin(): Plugin {
  const artifactDir = path.resolve(
    __dirname,
    '.aistudio/artifacts/brain/a471051d-dabc-44b4-b1e9-673dbc41df14'
  );
  const routes: Record<string, { file: string; mime: string }> = {
    '/souvik_showcase_kit.zip': { file: 'souvik_showcase_kit.zip', mime: 'application/zip' },
    '/behance_banner_meadow.png': { file: 'behance_banner_meadow.png', mime: 'image/png' },
    '/behance_banner_twilight.png': { file: 'behance_banner_twilight.png', mime: 'image/png' },
    '/behance_profile_obsidian.png': { file: 'behance_profile_obsidian.png', mime: 'image/png' },
    '/behance_profile_studio.png': { file: 'behance_profile_studio.png', mime: 'image/png' },
  };
  return {
    name: 'showcase-zip-download',
    configureServer(server) {
      for (const [route, meta] of Object.entries(routes)) {
        server.middlewares.use(route, (_req, res, next) => {
          const full = path.join(artifactDir, meta.file);
          if (!fs.existsSync(full)) return next();
          const stat = fs.statSync(full);
          res.setHeader('Content-Type', meta.mime);
          res.setHeader('Content-Length', String(stat.size));
          res.setHeader('Content-Disposition', `attachment; filename="${meta.file}"`);
          fs.createReadStream(full).pipe(res);
        });
      }
    },
  };
}

export default defineConfig(() => {
  return {
    base: './',
    plugins: [react(), tailwindcss(), showcaseDownloadPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined;
            if (id.includes('/react/') || id.includes('/react-dom/') || id.includes('/scheduler/')) {
              return 'vendor-react';
            }
            if (id.includes('/motion/') || id.includes('/framer-motion/')) {
              return 'vendor-motion';
            }
            if (id.includes('/lucide-react/')) {
              return 'vendor-icons';
            }
            return undefined;
          },
        },
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
