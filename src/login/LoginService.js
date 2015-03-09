App.factory('LoginService', function ($q, $http) {

    var config = jf.readFileSync(Config.configFile);

    return {
        login: function(username,password){
            var q = $q.defer();

            var options = {
                url: config.dc.url + '/login',
                method: 'POST',
                data: {
                    username: username,
                    password: password
                }
            };

            $http(options)
                .success(function (data) {
                    q.resolve(data);
                })
                .error(function (data, status) {
                    q.reject('Connection failed');
                });

            return q.promise;

        },
        getHospcode: function () {
            var q = $q.defer();

            var knex = require('knex')({
                client: 'mysql',
                connection: config.db
            });

            knex('opdconfig')
                .select('hospitalcode')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows[0].hospitalcode);
                });

            return q.promise;
        }
    };

});
