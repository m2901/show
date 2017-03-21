sampleApp.controller('MoviesController', function($scope, $http, $location, $rootScope) {

   var refresh = function () {
        $http.get('/movie/getMovie').success(function (response) {
            console.log('READ IS SUCCESSFUL');
			 $scope.shows = true;
			 $scope.details = false;
             $scope.moviList = response;
             $scope.movi = "";
        });
    };

    refresh();
	
	$scope.refreshAll=function(){
		 refresh();
	};
	
	$scope.setData=function(){
		     $scope.shows = true;
			 $scope.details = false;
	};
	
	$scope.bookMovie=function(movie){
		     $rootScope.bookedMovie = movie;
			 $location.path('/booking');
	};
	
	$scope.getMovieDetails = function (movie) {
         $http.get('/movie/getMovie/' + movie._id).success(function (response) {
			 $scope.shows = false;
			 $scope.details = true;           
			 $scope.movieList = response[0];
			
        });
    };
	
	$scope.searchMovie = function (movie) {
	
         $http.get('/movie/searchMovie/' + movie).success(function (response) {
			 console.log(response);
             $scope.moviList = response;

			if(response.length==0)
			{
				$scope.msg="No Movie Found";
			}
			else
			{
				$scope.msg="";
			}
			
        });
    };
	
	$scope.searchbyGenre = function () {
		
         $http.get('/movie/searchbyGenre/' + $scope.myVar).success(function (response) {
			 console.log(response);
             $scope.moviList = response;

			if(response.length==0)
			{
				$scope.msg="No Movie Found";
			}
			else
			{
				$scope.msg="";
			}
			
        });
    };

});