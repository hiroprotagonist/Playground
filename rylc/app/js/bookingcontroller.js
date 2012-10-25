'use strict';

(function(angular) {

function BookingController($scope, navigate) {

	$scope.rentals = [
		{ car:{manufacturer:'Mercedes', description:'SLK 500 Mc Laren', price: '53.60', id:'MB-1'},
		 id: 'mb9283', hireStartDate: new Date(2012, 5, 23), hireEndDate: new Date(2012, 6, 1)},
		{ car:{manufacturer:'Ferrari', description:'F 40', price: '263.00', id:'F40-1'},
		 id: 'fr1323', hireStartDate: new Date(2012, 6, 2), hireEndDate: new Date(2012, 6, 3)},
		{ car:{manufacturer:'MAN', description:'Giant', price: '1153.60', id:'MAN-2'},
		 id: 'man-01', hireStartDate: new Date(2012, 10, 1), hireEndDate: new Date(2012, 10, 3)}];
	
	$scope.totalPrice = function( rental ) {
		var delta = rental.hireEndDate -rental.hireStartDate;
		var daysRented = delta/1000/60/60/24;
		return (daysRented +1) * rental.car.price;
	};
}

BookingController.$inject = ['$scope', '$navigate'];

var module = angular.module('rylc.bookingcontroller', []);
module.controller('BookingController', BookingController);

})(angular);
