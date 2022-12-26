import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

const projectRootDir = resolve(__dirname);
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '$$': resolve(projectRootDir, "public"),
      '#': resolve(projectRootDir, "src"),
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      // '$' : path.resolve(__dirname, './src')
    }
  },
//   build: {
//     rollupOptions: {
//         output:{
//             manualChunks(id) {
//                 if (id.includes('node_modules')) {
//                     return id.toString().split('node_modules/')[1].split('/')[0].toString();
//                 }
//             }
//         }
//     }
// }
build: {
  // sourcemap: true,
  // outDir: "appBuild/",
  
  rollupOptions: {
      //   input: {
      //     main: resolve(__dirname, 'index.html')
      // },
      // output: {
      //     entryFileNames: `[name].js`,
      //     chunkFileNames: `[name].js`,
      //     assetFileNames: `[name].[ext]`,
      //     manualChunks(id) {
      //         if (id.includes('node_modules')) {
      //             return id.toString().split('node_modules/')[1].split('/')[0].toString();
      //         }
      //     }
      // }
      // external:["vue"],
      // output: {
      //   globals:{
      //     vue: 'Vue'
      //   }
      // }
  },
}
})
