const createScript = function (url) {
  return `<script src="${url}"></script>`;
};

const createStyles = function (url) {
  return `<link rel="stylesheet" href="${url}" type="text/css" media="screen" />`;
};

module.exports = function (name) {
  let result = '';
  switch (name) {
    case 'wp_head':
      result += createStyles('./styles/style.css');
      break;
    case 'wp_footer':
      result += createScript('./js/libraries.js');
      result += createScript('./js/scripts.js');
      break;
  }

  return result;
};
