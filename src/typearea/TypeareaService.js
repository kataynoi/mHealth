App.factory('TypeareaService', function ($q, $http) {

    var config = jf.readFileSync(Config.configFile);
    return {
        list: function (key) {
            var q = $q.defer();

            var options = {
                url: config.dc.url + '/typearea/list',
                method: 'POST',
                data: { key: key }
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
        },

        confirm: function (cid, key) {
            var q = $q.defer();

            var options = {
                url: config.dc.url + '/typearea/confirm',
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