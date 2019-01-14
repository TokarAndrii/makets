const withLogSimpleJS = fn => (...args) => {
  console.log('withLogSimpleJS Logging args: ', args);
  return fn(...args);
};

export default withLogSimpleJS;

const add = (a, b) => a + b;
const addWithLog = withLogSimpleJS(add);
addWithLog(13, 22);
