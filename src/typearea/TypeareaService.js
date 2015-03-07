App.factory('TypeareaService', function ($q, $http) {

    return {
        list: function () {
            var q = $q.defer();

            var options = {
                url: 'http://localhost:3000/list',
                method: 'POST',
                data: { hospcode: '04911' }
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