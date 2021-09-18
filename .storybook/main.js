const path = require('path');

module.exports = {
  stories: ['../controllers/**/*.stories.@(js|jsx|ts|tsx)'],
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
