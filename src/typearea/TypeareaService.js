App.factory('TypeareaService', function ($q, $http, Common) {

    var dcUrl = Common.getDCUrl();
    var db = Common.getDB();

    return {
        list: function (key) {
            var q = $q.defer();

            var options = {
                url: dcUrl + '/typearea/list',
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
                url: dcUrl + '/typearea/detail',
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
                url: dcUrl + '/typearea/confirm',
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

        getHOSTypearea: function () {
            var q = $q.defer();

            db('house_regist_type')
                .select('house_regist_type_id as id', 'house_regist_type_name as name')
                .orderBy('house_regist_type_id')
                .exec(function (err, rows) {
                    if (err) q.reject(err);
                    else q.resolve(rows);
                });

            return q.promise;
        },

        doChangeHOSTypearea: function (cid, typearea) {
            var q = $q.defer();

            db('person')
                .where('cid', cid)
                .update({
                    house_regist_type_id: typearea
                })
                .exec(function (err) {
                    if (err) q.reject(err);
                    else q.resolve();
                });

            return q.promise;
        },

        doChangeHDCTypearea: function (cid, typearea, hospcode, key) {
            var q = $q.defer();

            var options = {
                url: dcUrl + '/typearea/change',
                method: 'POST',
                data: {
                    cid: cid,
                    hospcode: hospcode,
                    typearea: typearea,
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