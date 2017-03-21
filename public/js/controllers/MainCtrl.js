sampleApp.controller('MainController', function($scope,$http,$location,$rootScope) {

    var refresh = function () {
        $http.get('/movie/getHomeMovie').success(function (response) {
            console.log('READ IS SUCCESSFUL');
			$scope.show = true;
			$scope.detail = false;
            $scope.movieList = response;
           
        });
    };

    refresh();
	
	$scope.setData=function(){
		     $scope.detail = false;
			 $scope.show = true;
			 refresh();
	};
	
	$scope.bookMovie=function(movie){
		     $rootScope.bookedMovie = movie;
			 $location.path('/booking');
	};

     $scope.getMovieDetails = function (movie) {
         $http.get('/movie/getMovie/' + movie._id).success(function (response) {
			 $scope.show = false;
			 $scope.detail = true;
            $scope.movieList = response[0];
        });
    };

});