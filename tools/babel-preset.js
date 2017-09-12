const BABEL_ENV = process.env.BABEL_ENV;
const building = BABEL_ENV != undefined && BABEL_ENV !== 'cjs';

const plugins = ['transform-object-rest-spread'];

if (BABEL_ENV === 'umd') {
  plugins.push('external-helpers');
}

if (process.env.NODE_ENV === 'production') {
  plugins.push(
    'dev-expression'
  );
}

module.exports = {
  presets: [
    ['env', {
      'es2015': {
        'loose': true,
        'modules': building ? false : 'commonjs'
      }
    }],
  ],
  plugins: plugins,
};
