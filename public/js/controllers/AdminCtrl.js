sampleApp.controller('AdminController', function($scope,$http) {

	var refresh = function () {
        $http.get('/movie/getMovie').success(function (response) {
            console.log('READ IS SUCCESSFUL');
			
            $scope.moviList = response;
            $scope.movi = "";
        });
		$http.get('/theatre/getTheatre').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.theatreList = response;
            $scope.theatre = "";
        });
		
		 $http.get('/city/getCity').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.cityList = response;
            $scope.city = "";
        });
		
		 $http.get('/showtiming/getShowtime').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.showtimeList = response;
            $scope.showtimes = "";
        });
		
		$http.get('/assignshowtime/getShowtime').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.asnshowtimesList = response;
            $scope.asnshowtimes = "";
        });

        $http.get('/assignmovie/getAssignmovi').success(function (response) {
            console.log('READ IS SUCCESSFUL');
            $scope.asnmoviesList = response;
            $scope.asnmovies = "";
        });
		
    };

    refresh();
	

    //movie
    $scope.addMovie = function (movi) {
          $http.get(`http://www.omdbapi.com/?t=${movi.moviTitle}&plot=short&r=json`).success(function (response) {
                            //console.log(response);
                            var movieObj={};
                            for(var key in response){
                                if(key=='Title' || key== 'Language' || key== 'Poster' || key== 'Genre' || key== 'Director' || key== 'Actors'){
                                    movieObj[key] = response[key];
                                     
                                }
                            }
                           
                           var serviceName = 'movi'  
                            $http.post('/movie/addMovie', movieObj).success(function (response) {
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
                           
                        });
        console.log($scope.contact);
       
    };

    $scope.removeMovie = function (movie) {
      
	  var r = confirm("Are you sure you want to delete this movie?");
	  if (r == true) {
        $http.delete('/movie/deleteMovie/' + movie._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
	  }
    };

    $scope.editMovie = function (movie) {
         $http.get('/movie/getMovie/' + movie._id).success(function (response) {
            $scope.movi = response[0];
        });
    };

   

    $scope.updateMovie = function () {
        console.log("REACHED UPDATE");
        console.log($scope.movi._id);
        $http.put('/movie/updateMovie/' + $scope.movi._id, $scope.movi).success(function (response) {
            console.log(response);
            refresh();
        })
    };
	
	//theatre
	$scope.addTheatre = function (theatre) {
                         
                            $http.post('/theatre/addTheatre', theatre).success(function (response) {
								
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeTheatre = function (theatre) {
       var r = confirm("Are you sure you want to delete this theater?");
	  if (r == true) {
        $http.delete('/theatre/deleteTheatre/' + theatre._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
	  }
    };

    $scope.editTheatre = function (theatre) {
         $http.get('/theatre/getTheatre/' + theatre._id).success(function (response) {
            $scope.theatre = response[0];
        });
    };

    $scope.updateTheatre = function () {
        console.log("REACHED UPDATE");
        $http.put('/theatre/updateTheatre/' + $scope.theatre._id, $scope.theatre).success(function (response) {
            console.log(response);
            refresh();
        })
    };
	
	//show timing
	 $scope.addShow = function (showtimes) {
		 
                            $http.post('/showtiming/addShow', showtimes).success(function (response) {
								
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeShowtime = function (showtimes) {
       var r = confirm("Are you sure you want to delete this Show Time?");
	  if (r == true) {
        $http.delete('/showtiming/deleteShowtime/' + showtimes._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
	  }
    };

    $scope.editShowtime = function (showtimes) {
         $http.get('/showtiming/getShowtime/' + showtimes._id).success(function (response) {
            $scope.showtimes = response[0];
        });
    };

    $scope.updateShowtime = function () {
        console.log("REACHED UPDATE");

        $http.put('/showtiming/updateShowtime/' + $scope.showtimes._id, $scope.showtimes).success(function (response) {
            console.log(response);
            refresh();
        })
    };
	
	
	//city
	 $scope.addCity = function (city) {
                         
                            $http.post('/city/addCity', city).success(function (response) {
								
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeCity = function (city) {
       var r = confirm("Are you sure you want to delete this City?");
	  if (r == true) {
        $http.delete('/city/deleteCity/' + city._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
	  }
    };

    $scope.editCity = function (city) {
         $http.get('/city/getCity/' + city._id).success(function (response) {
            $scope.city = response[0];
        });
    };

    $scope.updateCity = function () {
        console.log("REACHED UPDATE");
        
        $http.put('/city/updateCity/' + $scope.city._id, $scope.city).success(function (response) {
            console.log(response);
            refresh();
        })
    }
	
	
	//Assing show timing
	 $scope.addAsntime = function (asnshowtimes) {
		 
                            $http.post('/assignshowtime/addShow', asnshowtimes).success(function (response) {
								
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeAsntime = function (asnshowtimes) {
       var r = confirm("Are you sure you want to delete this Assign Show Time?");
	  if (r == true) {
        $http.delete('/assignshowtime/deleteShowtime/' + asnshowtimes._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
	  }
    };

    $scope.editAsntime = function (asnshowtimes) {
		
         $http.get('/assignshowtime/getShowtime/' + asnshowtimes._id).success(function (response) {
            $scope.asnshowtimes = response[0];
        });
    };

    $scope.updateAsntime = function () {
        console.log("REACHED UPDATE");

        $http.put('/assignshowtime/updateShowtime/' + $scope.asnshowtimes._id, $scope.asnshowtimes).success(function (response) {
            console.log(response);
            refresh();
        })
    };


    //assign movie

     $scope.addAsnmovi = function (asnmovies) {
		 
		 var ft = $('#fromdate').val();
		 var tt = $('#todate').val();
		 
         ft=moment(ft).format('L');
		 tt=moment(tt).format('L');
		 
		 $scope.asnmovies.fromdate=ft;
		 $scope.asnmovies.todate=tt;
		 
		         $http.post('/assignmovie/addAsnmovi', asnmovies).success(function (response) {
                                
                                console.log(response);
                                console.log("CREATE IS SUCCESSFUL");
                                refresh();
                            });
       
    };

    $scope.removeAsnmovi = function (asnmovies) {
       var r = confirm("Are you sure you want to delete this Assign Movie?");
      if (r == true) {
        $http.delete('/assignmovie/removeAsnmovi/' + asnmovies._id).success(function (response) {
            console.log(response);
            console.log('DELETED SUCCESSFULLY');
            refresh();
        });
      }
    };

    $scope.editAsnmovi = function (asnmovies) {
        
         $http.get('/assignmovie/editAsnmovi/' + asnmovies._id).success(function (response) {
            $scope.asnmovies = response[0];
        });
    };

    $scope.updateAsnmovi = function () {
        console.log("REACHED UPDATE");

        $http.put('/assignmovie/updateAsnmovi/' + $scope.asnmovies._id, $scope.asnmovies).success(function (response) {
            console.log(response);
            refresh();
        })
    };
	
	
	$scope.getTheatreDetail = function () {
		
         $http.get('/theatre/getByCity/' + $scope.asnmovies.asnmovicity).success(function (response) {
			 console.log(response);
             $scope.atheatreList = response;

        });
    };
	

});