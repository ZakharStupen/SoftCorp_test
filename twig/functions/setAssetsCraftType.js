module.exports = function (imgUrl, imgAlt) {
  return {
    title: !!imgAlt ? imgAlt : 'rr',
    src: !!imgUrl ? imgUrl : 'https://picsum.photos/1000/800',
    getUrl: () => {
      return !!imgUrl ? imgUrl : 'https://picsum.photos/1000/800';
    },
  };
};
