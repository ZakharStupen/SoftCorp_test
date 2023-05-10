module.exports = function (image, options, settings, ...args) {
    let img_src = !!image && !!image.src ? image.src : 'https://picsum.photos/1000/800';
    let result;
    if (Array.isArray(options)) {
        result = [];
        options.forEach((item) => {
            result.push(img_src);
        });
    } else {
        result = img_src;
    }
    return result;
};
