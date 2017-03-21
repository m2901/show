sampleApp.controller('cancellationController', function($scope,$http, $rootScope, $location) {

$scope.cancellation="Cancel your ticket";
$scope.msg="";
$scope.shows=true;

var refresh = function () {
         $http.get('/booking/getBooking').success(function (response) {
			
            $scope.cancelList = response;
            $scope.cancel = "";
        });
	};

    refresh();
	
	$scope.cancelTickets = function (cancel) {
		
           var r = confirm("Are you sure you want to cancel this movie?");
        if (r == true) {
        $http.delete('/booking/deleteBooking/' + cancel._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
      }
    };

});

