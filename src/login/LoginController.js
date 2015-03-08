
App.controller('LoginController', function ($scope,$window,$rootScope,LoginService, LxNotificationService, LxProgressService) {

    $scope.login = function(){
        LoginService.login($scope.username,$scope.password)
            .then(function(data){

                if(data.ok){
                    $window.sessionStorage.setItem('fullname',data.fullname);
                    $window.sessionStorage.setItem('key',data.key);
                    $rootScope.fillname=data.fullname;
                    $window.location.href ="../pages/index.html";
                }else{
                    LxNotificationService.error(" ผู้ใช้งาน ไม่ถูกต้อง ");
                }
            }, function(){
                LxNotificationService.error(" Connection Fail")
            }

        );
    };
});