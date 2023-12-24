/** @type { import('@storybook/react-vite').StorybookConfig } */
const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "storybook-css-modules",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  babel: async (opt) => ({
    ...opt,
    plugins: [],
  }),
  features: {
    previewMdx2: true,
    babelModeV7: true,
  },
  docs: {
    autodocs: true,
    defaultName: "Documentation",
  },
};
export default config;
