/**
 * @description 全局声明文件
 * */

// *
/// <reference types="vite/client" />

// * 支持 Vue 文件的类型定义，从而确保在使用 Vite 和 Vue 的组合时，能够正确处理 .vue 文件的导入和使用
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const component: DefineComponent<any, {}, any>
    export default component
}
