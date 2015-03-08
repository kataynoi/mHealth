App.factory('TypeareaService', function ($q, $http) {

    var config = jf.readFileSync(Config.configFile);
    return {
        list: function (hospcode, key) {
            var q = $q.defer();

            var options = {
                url: config.dc.url + '/typearea/list',
                method: 'POST',
                data: {
                    hospcode: hospcode,
                    key: key
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

        detail: function (cid, key) {
            var q = $q.defer();

            var options = {
                url: config.dc.url + '/typearea/detail',
                method: 'POST',
                data: {
                    cid: cid,
                    key: key
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
        }
    };

});