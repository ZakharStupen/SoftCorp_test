module.exports = [
  {
    name: 'function',
    func: require('./function'),
  },
  {
    name: 'getSeoField',
    func: require('./getSeoField'),
  },
  {
    name: 'setAssetsCraftType',
    func: require('./setAssetsCraftType'),
  },
  {
    name: 'getenv',
    func: function (args) {
      return 'dev';
    },
  },
  {
    name: 'setTransform',
    func: function (args) {
      return './setTransform';
    },
  },
  {
    name: 'getSrcset',
    func: function (args) {
      return './getSrcset';
    },
  },
];
