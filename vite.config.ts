import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'node:path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// * https://vitejs.dev/config/
export default defineConfig({
    plugins: [
      vue({
          template: {
              compilerOptions: {
                  // * 配置isCustomElement是为了支持原生自定义元素。如果自定义的标签不是vue组件的话，编译器在解析的时候会抛出错误提示，需要做以下配置：
                  isCustomElement: (tag) => tag === 'icon-park-icon',
              },
          },
      }),
      // * ElementPlus组件 按需自动导入
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
    ],
    },
    server: {
        open: true,
        host: '0.0.0.0',
        // * 允许你将某些请求转发到其他服务器，而不是直接发送到当前开发服务器
        proxy: {
            // * 请求路径的匹配规则，所有以 /api 开头的请求都将被代理
            '/api': {
                // * 转发请求的外部服务器
                // target: 'http://dev.srv.shield.dev.jt.com', // 开发环境
                // target: 'http://v2.1.0.srv.llm-contract.test.jt.com/', // 测试环境
                // * 可选的路径重写函数，用于在转发之前修改请求路径，它会将路径中的 /api 前缀移除，比如：请求 /api/user 会被重写为 /user 并发送到目标地址
                // rewrite: (path) => path.replace(/^\/api/, ''),
                // * 用于控制请求头中的 Origin 字段。设为 true 时，代理会将请求的来源改为目标 URL 的来源。这在某些 API 服务器中可能是必要的，以防止因来源不匹配而导致的请求失败。
                // changeOrigin: true,
            },
        },
    },
})
