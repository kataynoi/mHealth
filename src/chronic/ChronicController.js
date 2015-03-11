App.controller('ChronicController', function ($scope, $window, $filter, ChronicService, LxNotificationService, LxProgressService, LxDialogService) {

    LxProgressService.linear.show('#5fa2db', '#progress');

    var hospcode = $window.sessionStorage.getItem('hospcode');
    var key = $window.sessionStorage.getItem('key');

    $scope.chronicSuccess = false;
    $scope.chronicPeople = [];

    $scope.getChronic = function () {

        LxNotificationService.confirm('ยืนยันการตรวจสอบ', 'คุณต้องการตรวจสอบข้อมูลโรคเรื้อรังจากส่วนกลางหรือไม่? (การตรวจสอบอาจใช้เวลานาน)', {
            ok: 'ใช่, ฉันต้องการตรวจสอบ',
            cancel: 'ไม่ใช่'
        }, function (res) {
            if (res) {
                LxProgressService.circular.show('#5fa2db', '#progressChronic');
                ChronicService.getChronic(hospcode, key)
                    .then(function (data) {
                        if (data.ok) {
                            $scope.chronicPeople = data.rows;
                            $scope.chronicSuccess = true;
                            LxProgressService.circular.hide();
                        } else {
                            if (angular.isObject(data.msg)) {
                                console.log(data.msg);
                                LxNotificationService.error('View log to see error.');
                                LxProgressService.circular.hide();
                                $scope.chronicSuccess = false;
                            } else {
                                LxNotificationService.error(data.msg);
                                LxProgressService.circular.hide();
                                $scope.chronicSuccess = false;
                            }
                        }
                    }, function (err) {
                        console.log(err);
                        LxNotificationService.error('Connection failed.');
                        LxProgressService.circular.hide();
                        $scope.chronicSuccess = false;
                    });
            }
        });

    };


    $scope.doExport = function () {
        var json2xls = require('json2xls');
        var exportFilePath = path.join(Config.appPath, 'chroinc.xls');

        var data = [];

        _.forEach($scope.chronicPeople, function (v) {
            var obj = {
                cid: v.CID,
                fullname: v.PTNAME,
                birth: $filter('toThaiDate')(v.BIRTH),
                age: $filter('countAge')(v.BIRTH),
                diag_hospcode: v.HOSPCODE,
                diag_hospname: v.HOSPNAME,
                diag: v.DIAGCODE,
                date_serv: $filter('toThaiDate')(v.DATE_SERV)
            };

            data.push(obj);
        });

        var xls = json2xls(data);
        fs.writeFileSync(exportFilePath, xls, 'binary');

        LxNotificationService.success('ส่งออกไฟล์เสร็จเรียบร้อยแล้ว');

        gui.Shell.openItem(exportFilePath);

    };

    $scope.doImportChronic = function () {

    };




});
