
App.controller('LoginController', function ($scope,$window,$rootScope,LoginService, LxNotificationService, LxProgressService) {

    $scope.login = function(){

        LxProgressService.linear.show('#5fa2db', '#progress');

        LoginService.login($scope.username,$scope.password)
            .then(function(data){

                if(data.ok){
                    LxProgressService.linear.hide();
                    LoginService.getHospcode()
                        .then(function(hospcode) {
                            $window.sessionStorage.setItem('hosxp_hospcode', hospcode);
                            $window.sessionStorage.setItem('fullname',data.fullname);
                            $window.sessionStorage.setItem('hospcode', data.lastname);
                            $window.sessionStorage.setItem('key',data.key);
                            $rootScope.fillname=data.fullname;
                            $window.location.href ="../pages/index.html";
                        }, function (err) {
                            $window.sessionStorage.setItem('hosxp_hospcode', '00000');
                            $window.sessionStorage.setItem('fullname',data.fullname);
                            $window.sessionStorage.setItem('hospcode', data.lastname);
                            $window.sessionStorage.setItem('key',data.key);
                            $rootScope.fillname=data.fullname;
                            $window.location.href ="../pages/index.html";
                        });

                }else{
                    LxNotificationService.error(" ผู้ใช้งาน ไม่ถูกต้อง ");
                    LxProgressService.linear.hide();
                }
            }, function(){
                LxNotificationService.error(" Connection Fail");
                LxProgressService.linear.hide();
            }

        );
    };
});