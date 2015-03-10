App.factory('IndexService', function ($q, $http, Common) {

    var url = Common.getDCUrl();

    return {
        checkNewVersion: function (oldVersion) {

            var q = $q.defer();
            var options = {
                url: url + '/version',
                method: 'POST',
                old_version: oldVersion
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