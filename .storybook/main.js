const path = require('path');

module.exports = {
  stories: [
    '../stories/**/*.stories.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../controllers/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    config.experiments = {
      ...(config.experiments ?? {}),
      buildHttp: true,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@controllers': path.resolve(__dirname, '../controllers'),
    };

    return config;
  },
};
