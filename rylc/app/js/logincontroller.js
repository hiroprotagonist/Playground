'use strict';

/* Controllers */
(function(angular) {

function LoginController($scope, navigate) {
	$scope.username = "";
	$scope.password = "";
	
	/*
	 * TRUE when a its worth to send the data to the authentication service
	 */
	$scope.loginPossible = function() {
		// Test if username and password are not emtpy
		return $scope.username && $scope.password;
	};
	
	$scope.login = function() {
		$scope.customer = {
			name: $scope.username
		};
		navigate("#welcomepage");
	};
}
LoginController.$inject = ["$scope", "$navigate"];

var module = angular.module("rylc.logincontroller", []);
module.controller("LoginController", LoginController);

})(angular);
