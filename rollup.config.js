import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import { terser } from "rollup-plugin-terser";

export default {
  input: "scripts/script.ts", // Входной файл
  output: {
    file: "scripts/script.js", // Выходной файл
    format: "iife", // Формат вывода
    sourcemap: false,
  },
  plugins: [
    resolve(), // Разрешение модулей из node_modules
    commonjs(), // Преобразование CommonJS модулей в ES6
    typescript({ tsconfig: "./tsconfig.json" }), // Компиляция TypeScript
    terser(), // Минификация кода
  ],
};
