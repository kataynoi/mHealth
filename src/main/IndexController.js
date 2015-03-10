App.controller('IndexController', function ($scope, IndexService, LxNotificationService) {
    $scope.version = Config.version;
    $scope.hasNewVersion = false;

    /*console.log('This platform is ' + process.platform);
    console.log('This processor architecture is ' + process.arch);*/
    $scope.win=process.arch;
    //check new version
    $scope.checkVersion = function () {

        IndexService.checkNewVersion($scope.version)
            .then(function (data) {
                if (data.ok) {
                    if (_.size(data)) {

                        // check version
                        var currentVersion = $scope.version;
                        var newVersion = data.version;
                        var c = currentVersion.split('.');
                        var n = newVersion.split('.');

                        // x.y.z current
                        // i.j.k new

                        // check main version
                        if (c[0] > n[0]) {
                            LxNotificationService.info('โปรแกรมของท่านเป็นเวอร์ชันใหม่อยู่แล้ว');
                            $scope.hasNewVersion = false;
                        } else if (c[0] == n[0]) {// x == i
                            if (c[1] > n[1]) {
                                LxNotificationService.info('โปรแกรมของท่านเป็นเวอร์ชันใหม่อยู่แล้ว');
                                $scope.hasNewVersion = false;
                            } else if(c[1] < n[1]) {
                                LxNotificationService.info('ตรวจพบโปรแกรมเวอร์ชั่นใหม่ กรุณาอัปเดทโปรแกรม');
                                $scope.hasNewVersion = true;
                            } else {
                                // eq
                                if (c[2] > n[2]) {
                                    LxNotificationService.info('โปรแกรมของท่านเป็นเวอร์ชันใหม่อยู่แล้ว');
                                    $scope.hasNewVersion = false;
                                } else if (c[2] < n[2]) {
                                    LxNotificationService.info('ตรวจพบโปรแกรมเวอร์ชั่นใหม่ กรุณาอัปเดทโปรแกรม');
                                    $scope.hasNewVersion = true;
                                } else {
                                    LxNotificationService.info('โปรแกรมของท่านเป็นเวอร์ชันใหม่อยู่แล้ว');
                                    $scope.hasNewVersion = false;
                                }
                            }
                        }

                        if ($scope.hasNewVersion) {
                            $scope.hasNewVersion = true;
                            if($scope.win=='x64'){
                                $scope.downloadUrl = data.url64;
                            }else{
                                $scope.downloadUrl = data.url32;
                            }

                            $scope.newVersion = data.version;
                            $scope.releasedDate = data.released_date;
                            $scope.whatNew = data.what_new;
                        }

                    } else {
                        LxNotificationService.info('ไม่พบเวอร์ชันใหม่');
                    }


                } else {
                    if (angular.isObject(data.msg)) {
                        console.log(data.msg);
                        LxNotificationService.error('เกิดข้อผิดพลาด กรุณาดู Log');
                    } else {
                        LxNotificationService.error(data.msg);
                    }
                }
            }, function (err) {

            });
    };

    $scope.doDownload = function (url) {
        gui.Shell.openExternal(url);
    };

    // Check new version
    $scope.checkVersion();
});