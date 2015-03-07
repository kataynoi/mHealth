/**
 Index module
 **/
var App = angular.module('app', ['lumx', 'ngRoute']);

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
