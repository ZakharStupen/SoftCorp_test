module.exports = function (args) {
    /* using: {% set pool_zones = pool_zones_json | json_decode %} */
    return JSON.parse(args);
};
