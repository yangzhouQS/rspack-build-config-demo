import eslintConfig from "@cs/js-eslint-config-library";

export default eslintConfig({
  ignores: ["dist", "examples"],
  // 自定义验证规则
  rules: {
    "no-console": "off", /* 允许使用console.log */
    "no-case-declarations": "off", /* 允许在switch case中创建变量 */
    "no-new": "off",
  },
});

