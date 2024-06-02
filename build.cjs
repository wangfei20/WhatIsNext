const esbuild = require('esbuild');

esbuild.build({
    entryPoints: ["./pageRoutes"],
    entryNames: '[dir]/[name]',
    // outbase: 'src',
    bundle: true,
    platform: 'node',
    outdir: 'out',
    loader: { '.js': 'jsx' },
    format: 'esm'
  }).then(()=>{
    console.log("good!");
  })

  esbuild.build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outfile: 'dist/bundle.js',
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    sourcemap: true,
    define: {
      'process.env.NODE_ENV': '"development"', // Or `"production"` for production builds
    }
  }).catch(() => process.exit(1));