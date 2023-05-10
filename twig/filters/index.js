module.exports = [
    {
        name: "nameOfFilter",
        func: function (args) {
            return "the filter";
        }
    },
    {
        name: "json_decode",
        func: require('./json_decode'),
    }
]
