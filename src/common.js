App.factory('Common', function () {

    var config = jf.readFileSync(Config.configFile);

    return {
        getDB: function () {
            return require('knex')({
                client: 'mysql',
                connection: config.db,
                pool: {
                    min: 0,
                    max: 100
                },
                charset: 'utf8'
            });
        },
        getDCUrl: function () {
            return config.dc.url;
        }
    };

});