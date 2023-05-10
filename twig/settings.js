const Mock = require('./data/Mock');
const mock = new Mock();

// const config = require('./config.json');

const dataMethods = {
  craft: require('./data/craft'),
};

module.exports = {
  getData: function (sourcePath) {
    return {
      ...dataMethods,
      ...mock.getData(sourcePath),
    };
  },
  functions: require('./functions/index'),
  filters: require('./filters/index'),
};
