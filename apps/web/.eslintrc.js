const config = require('@monorepo-deploy/eslint-config');

module.exports = {
  ...config,
  extends: [
    ...config.extends,
    'next/core-web-vitals',
  ],
};
