/**
 Index module
 **/
var App = angular.module('app', ['lumx', 'ngRoute']);
var moment = require('moment');

App.config(function($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: '../main/Index.html',
            controller: 'IndexController'
        })
        .when('/typearea', {
            templateUrl: '../typearea/Index.html',
            controller: 'TypeareaController'
        })
        .otherwise({ redirectTo: '/' });

});

App.controller('ToolbarController', function($scope,$rootScope,$window){
    $rootScope.fullname=$window.sessionStorage.getItem('fullname');
    $scope.logout=function(){
        $window.sessionStorage.removeItem('fullname');
        $window.sessionStorage.removeItem('key');
        $window.location.href="../login/Login.html";
    };
});
