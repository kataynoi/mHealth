App.factory('ChronicService', function ($q, $http, Common) {

    var dcUrl = Common.getDCUrl();
    var db = Common.getDB();

    return {
        /** Chronic **/
        getChronic: function (hospcode, key) {
            var q = $q.defer();

            var options = {
                url: dcUrl + '/chronic/duplicated/list',
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
        }
    };
});
