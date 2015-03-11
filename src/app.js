/**
 Index module
 **/
var path = require('path'),
    fs = require('fs'),
    jf = require('jsonfile'),
    gui = require('nw.gui'),
    moment = require('moment'),
    _ = require('lodash'),
    win = gui.Window.get();

jf.spaces = 2;

var Config = {};
Config.appPath = gui.App.dataPath;
Config.configFile = path.join(Config.appPath, 'config.json');
// File version
Config.version = '1.0.0';

// Check configure file exist.
var isExist = fs.existsSync(Config.configFile);
// Check file if not exist.
if (!isExist) {
    var defaultConfig = {
        db: {
            host: '127.0.0.1',
            port: 3306,
            database: 'db',
            user: 'user',
            password: 'pass'
        },
        dc: {
            url: 'http://localhost:3000'
        }
    };

    jf.writeFileSync(Config.configFile, defaultConfig);
}

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
        .when('/chronic', {
            templateUrl: '../chronic/Index.html',
            controller: 'ChronicController'
        })
        .otherwise({ redirectTo: '/' });

});

App.controller('ToolbarController', function($scope,$rootScope,$window){
    $rootScope.fullname = $window.sessionStorage.getItem('fullname');
    $scope.logout = function(){
        $window.sessionStorage.removeItem('fullname');
        $window.sessionStorage.removeItem('key');
        $window.sessionStorage.removeItem('hospcode');
        $window.sessionStorage.removeItem('hosxp_hospcode');

        $window.location.href="../login/Login.html";
    };
});
