App.controller('ConnectionController', function ($scope, LxNotificationService) {

    // Get configure file
    $scope.config = jf.readFileSync(Config.configFile);

    $scope.save = function () {
        jf.writeFile(Config.configFile, $scope.config, function (err) {
            if (err) {
                console.log(err);
                LxNotificationService.error('ไม่สามารถบันทึกได้');
            } else {
                gui.App.quit();
            }
        });
    };
});