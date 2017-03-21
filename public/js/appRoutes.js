
var appRoutes = angular.module('appRoutes', ['ngRoute']);

appRoutes.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'

		})

		.when('/booking', {
			templateUrl: 'views/booking.html',
			controller: 'BookingController'
		})

		.when('/movies', {
			templateUrl: 'views/movies.html',
			controller: 'MoviesController'
    
		})

		.when('/confirm', {
			templateUrl: 'views/confirm.html',
			controller: 'ConfirmController'	
		})
		
		.when('/cancellation', {
			templateUrl: 'views/cancellation.html',
			controller: 'cancellationController'	
		})
		
		.when('/admin', {
			templateUrl: 'views/admin.html',
			controller: 'AdminController',
            access: {restricted: true}			
		})
		
		.when('/login', {
            templateUrl: 'views/login.html',
            controller: 'loginController',
            access: {restricted: false}
        })
        .when('/logout', {
            controller: 'logoutController',
            access: {restricted: true}
         })
         .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'registerController',
            access: {restricted: false}
          })
		
		.otherwise({
         redirectTo: '/'
        });

	$locationProvider.html5Mode(true);

}]);

appRoutes.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){			
          $location.path('/login');
          $route.reload();			
        }
		
		
      });
  });
});