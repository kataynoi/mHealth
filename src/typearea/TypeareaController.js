App.controller('TypeareaController', function ($scope, $window, TypeareaService, LxNotificationService, LxProgressService, LxDialogService) {

    $scope.isSuccess = false;
    LxProgressService.linear.show('#5fa2db', '#progress');

    var hospcode = $window.sessionStorage.getItem('hospcode');
    var key = $window.sessionStorage.getItem('key');

    TypeareaService.list(key)
        .then(function (data) {
            if (data.ok) {
                $scope.people = data.rows;
                $scope.total = data.total;

                if ($scope.total < 50) $scope.msg = 'ซ้ำทั้งหมด ' + $scope.total + ' คน';
                else $scope.msg = 'แสดง 50 คน จากทั้งหมด ' + $scope.total + ' คน';

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

    $scope.detail = function (cid) {
        TypeareaService.detail(cid, key)
            .then(function (data) {
                if (data.ok) {
                    $scope.items = data.rows;
                    LxDialogService.open('mdlDetail');
                } else {
                    LxNotificationService.error(data.msg);
                    LxProgressService.linear.hide();
                    $scope.isSuccess = true;
                }
            }, function (err) {
                LxNotificationService.error('Connection failed');
            });
    };

    $scope.confirm = function (cid) {
        LxNotificationService.confirm('ยืนยันข้อมูล', 'คุณต้องการยืนยันข้อมูล Typearea ของคนนี้ใช่หรือไม่?', {
            ok: 'ใช่, ฉันต้องการยืนยัน',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                // yes
                TypeareaService.confirm(cid, key)
                    .then(function (data) {
                        if (data.ok) {
                            var idx = _.findIndex($scope.people, {cid: cid});

                            $scope.people[idx].confirm_hospcode = $window.sessionStorage.getItem('hospcode');

                        } else {

                        }
                    }, function (err) {
                        LxNotificationService.error('Connection failed');
                    });
            }
        });
    };

    $scope.checkConfirm = function (hospcode, confirm_hospcode) {
        if (!confirm_hospcode) return 0;
        if (confirm_hospcode && (confirm_hospcode == hospcode)) return 1;
        if (confirm_hospcode && (confirm_hospcode != hospcode)) return 2;
        return -1;
    };

});