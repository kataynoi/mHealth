App.controller('TypeareaController', function ($scope, TypeareaService, LxNotificationService, LxProgressService) {

    $scope.isSuccess = false;
    LxProgressService.linear.show('#5fa2db', '#progress');

    TypeareaService.list()
        .then(function (data) {
            if (data.ok) {
                $scope.people = data.rows[0];
                LxProgressService.linear.hide();
                $scope.isSuccess = true;
            } else {
                if (angular.isObject(data.msg)) {
                    console.log(data.msg);
                    LxNotificationService.error('View log to see error');
                    LxProgressService.linear.hide();
                    $scope.isSuccess = true;
                } else {
                    LxNotificationService.error(data.msg);
                    LxProgressService.linear.hide();
                    $scope.isSuccess = true;
                }
            }
        }, function (err) {
            LxNotificationService.error(err);
            LxProgressService.linear.hide();
        });


});