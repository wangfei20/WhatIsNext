import esbuild from 'esbuild'
import postcssPlugin from '@deanc/esbuild-plugin-postcss'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"

esbuild.build({
    entryPoints: ["./pagesRouterServer"],
    entryNames: '[dir]/[name]',
    bundle: true,
    platform: 'node',
    outdir: 'out',
    loader: { '.js': 'jsx' },
    format: 'esm'
  }).then(()=>{
    console.log("good!");
    esbuild.build({
      entryPoints: ['src/index.js'],
      bundle: true,
      outfile: 'dist/bundle.js',
      plugins: [
        postcssPlugin({
          plugins: [autoprefixer,tailwindcss],
        })
      ],
      loader: { '.js': 'jsx', '.jsx': 'jsx' },
      sourcemap: true,
      define: {
        'process.env.NODE_ENV': '"development"',
      }
    }).catch(() => process.exit(1));
  })