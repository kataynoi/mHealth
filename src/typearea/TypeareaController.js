App.controller('TypeareaController', function ($scope, $window, $filter, TypeareaService, LxNotificationService, LxProgressService, LxDialogService) {

    $scope.isSuccess = false;
    $scope.typeareas = [];

    LxProgressService.linear.show('#5fa2db', '#progress');

    var hospcode = $window.sessionStorage.getItem('hospcode');
    var key = $window.sessionStorage.getItem('key');

    TypeareaService.list(key)
        .then(function (data) {
            if (data.ok) {
                $scope.people = data.rows;
                $scope.total = data.total;
                $scope.totalCurrent = _.size(data.rows);
                //if ($scope.total < 50) $scope.msg = 'ซ้ำทั้งหมด ' + $scope.total + ' คน';
                //else $scope.msg = 'แสดง 50 คน จากทั้งหมด ' + $scope.total + ' คน';

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

    // Get hos typearea
    TypeareaService.getHOSTypearea()
        .then(function (rows) {
            $scope.typeareas = rows;
        });

    $scope.detail = function (cid) {
        TypeareaService.detail(cid, key)
            .then(function (data) {
                if (data.ok) {
                    $scope.items = data.rows;
                    LxDialogService.open('mdlDetail');
                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                    } else {
                        LxNotificationService.error(data.msg);
                        LxProgressService.linear.hide();
                        $scope.isSuccess = true;
                    }

                }
            }, function (err) {
                console.log(err);
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
                            var idx = _.findIndex($scope.people, {CID: cid});
                            if (idx != -1) {
                                $scope.people[idx].confirm_hospcode = $window.sessionStorage.getItem('hospcode');
                            }

                            console.log($scope.people[idx]);
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(data.msg);
                                LxNotificationService.error('เกิดข้อผิดพลาดกรุณาดู Log');
                            } else {
                                LxNotificationService.error(data.msg);
                            }

                        }
                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('Connection failed');
                    });
            }
        });
    };

    $scope.checkConfirm = function (hospcode, confirm_hospcode) {
        if (confirm_hospcode) {
            if (confirm_hospcode == hospcode) {
                return 1;
            } else if (confirm_hospcode != hospcode) {
                return 2;
            } else {
                return -1;
            }
        } else {
            return 0;
        }
    };

    $scope.setSelectedTypearea = function (data) {
        $scope.typeareaId = data.id;
    };

    $scope.showConfirm = function (cid) {
        $scope.cid = cid;
        var idx = _.findIndex($scope.people, {CID: cid});
        $scope.fullname = [$scope.people[idx].NAME, $scope.people[idx].LNAME].join(' ');
        LxDialogService.open('mdlChangeTypearea');
    };

    $scope.doConfirm = function () {

        if(angular.isUndefined($scope.typeareaId)) {
            LxNotificationService.error('กรุณาเลือก Typearea ที่ต้องการเปลี่ยน');
        } else {
            var hospcode = $window.sessionStorage.getItem('hospcode');
            var hosxp_hospcode = $window.sessionStorage.getItem('hosxp_hospcode');

            if (hosxp_hospcode != hospcode) {
                LxNotificationService.error('คุณไม่มีสิทธิ์ในการเปลี่ยนแปลงข้อมูลนี้ เนื่องจากข้อมูลในฐานปัจจุบัน ไม่ใช่ของคุณ');
            } else {
                LxNotificationService.confirm('ยืนยันการเปลี่ยน Typearea', 'คุณต้องการเปลี่ยนแปลง Typearea นี้่ ใช่หรือไม่? [** การเปลี่ยนแปลงจะทำการเปลี่ยนทั้งในฐาน HOSXP และ ใน HDC  **]', {
                    ok: 'ใช่ ฉันต้องการเปลี่ยน',
                    cancel: 'ไม่ใช่'
                }, function (res) {
                    if (res) {
                        // do change
                        // 1. Change HOSxP
                        // 2. Change HDC
                        var promise = TypeareaService.doChangeHOSTypearea($scope.cid, $scope.typeareaId);

                            promise.then(function () {
                                return TypeareaService.doChangeHDCTypearea($scope.cid, $scope.typeareaId, hosxp_hospcode, key);
                            }).then(function (data) {
                                if (data.ok) {
                                    LxNotificationService.success('เปลี่ยน Typearea เสร็จเรียบร้อยแล้ว');
                                    LxDialogService.close('mdlChangeTypearea');
                                    // find index
                                    var idx = _.findIndex($scope.people, {CID: $scope.cid});
                                    // remove person from target
                                    $scope.people.splice(idx, 1);
                                    $scope.total--;
                                    $scope.totalCurrent--;
                                } else {
                                    if (angular.isObject(data.msg)) {
                                        console.log(data.msg);
                                        LxNotificationService.error('ไม่สามารถเปลี่ยนแปลงข้อมูลได้ กรุณาดู Log');
                                    } else {
                                        LxNotificationService.error(data.msg);
                                    }
                                }
                            }, function (err) {
                                console.log(err);
                                LxNotificationService.error('ไม่สามารถเปลี่ยนแปลงข้อมูลได้ กรุณาดู Log');
                            });
                    }
                });
            }
        }

    };

    $scope.closingTypearea = function () {
        $scope.cid = null;
        $scope.fullname = null;
        $scope.typeareaId = null;
    };

});