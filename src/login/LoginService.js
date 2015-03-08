App.factory('LoginService', function ($q, $http) {

    return {
        login: function(username,password){
            var q = $q.defer();

            var options = {
                url: 'http://192.168.10.108:3000/login',
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

        }
    };

});
