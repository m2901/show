sampleApp.controller('BookingController', function($scope,$http, $rootScope, $location) {

	$scope.tagline = 'Book your tickets here!';
	$scope.BookedMovie=$rootScope.bookedMovie;

	var refresh=function() {
		
		var promise1=new Promise(function(resolve,reject){
			 $http.get('/assignmovie/getAssignmovi').success(function (response) {          
             //$scope.asnmoviesList = response;
             resolve(response);
        });
		});
		var promise2=promise1.then(function(asmovies){
	    $http.get('/assignshowtime/getShowtime').success(function (response) {
			
			
			var amovie=[];
						
			for(let assMov of asmovies)
			{
				var amovieObj={};
				if(assMov.asnmovi==$scope.BookedMovie.moviTitle)
				{
						
					amovieObj.theatre=assMov.asnmovitheatre;
					amovieObj.fromdate=assMov.fromdate;
					amovieObj.todate=assMov.todate;
					amovieObj.city=assMov.asnmovicity;
					amovie.push(amovieObj);
					
				}
				
			}
			
          
			var movieShowTimings=[];
			
			for(let thrts of amovie)
			{
				let showTimeTemp=[];
				let theatreShowTimes={};
				
				for(let showtimes of response)
				{
					if(thrts.theatre==showtimes.asntheatre)
					{
												
						theatreShowTimes.theatre=showtimes.asntheatre;
						theatreShowTimes.fromdate=thrts.fromdate;
						theatreShowTimes.todate=thrts.todate;
						theatreShowTimes.city=thrts.city;
					
						showTimeTemp.push(showtimes.asntime);
					}
					
				}
				theatreShowTimes.showTimings=showTimeTemp;
                movieShowTimings.push(theatreShowTimes);
			}
			
			
            $scope.asnmoviesList = movieShowTimings;
			if(movieShowTimings.length==0)
			{
				$scope.msg="No Theatre Found!";
			}
			else{
				$scope.msg="";
			}
           
        });
		});
		
	  
	};
	refresh();

	$scope.handleThisElement=function($event){
		   $rootScope.splitId=$event.target.id.split('-');
		   var splitId=$event.target.id.split('-');
		   $rootScope.totalSeats=0;
		   $http.get('/theatre/getTheatre').success(function (response) {
            
			for(let theatre of response)
			{
				if(theatre.title==splitId[0])
				{
					$rootScope.totalSeats=theatre.no_of_seat;
					$rootScope.totalPrice=theatre.amount;
					$rootScope.title=theatre.title;
					$rootScope.showtime=splitId[1];
					$rootScope.fromdate=splitId[2];
					$rootScope.todate=splitId[3];
					$rootScope.bookedMovie=$scope.BookedMovie.moviTitle;
					$rootScope.moviPoster=$scope.BookedMovie.moviPoster;
					$rootScope.city=splitId[4];
					
				}
			}
           $location.path('/confirm');

        });
		   
	};

});