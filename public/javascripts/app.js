var todoApp = angular.module('todoApp',['todoControllers', 'todoServices', 'todoFilters', 'ui.router', 'angular-loading-bar']);
var todoControllers = angular.module('todoControllers', []);
var todoServices = angular.module('todoServices', []);
var todoFilters = angular.module('todoFilters', []);

todoApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/login');
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'partials/login.html',
    controller: 'SessionController'
  })
  .state('home', {
    url: '/home',
    views: {
      '': {
        templateUrl: 'partials/home.html',
      },
      'content@home': {
        templateUrl: 'partials/todos.html',
        controller: 'TodoListCtrl'
      }
    }
  })
  .state('home.profile', {
    url: '/profile',
    views: {
      'content@home': {
        templateUrl: 'partials/profile.html',
        controller: 'ProfileCtrl'
      }
    }
  })
  .state('home.todos', {
    url: '/todos',
    views: {
      'content@home': {
        templateUrl: 'partials/todos.html',
        controller: 'TodoListCtrl'
      }
    }
  })
  .state('home.todos.create', {
    url:'/create',
    templateUrl: 'partials/todos.create.html',
    controller: 'TodoListCtrl'
  })
  .state('home.todos.show', {
    url:'/show/:todoId',
    templateUrl: 'partials/todos.show.html',
    controller: 'TodoShowCtrl'
  })
}]);

todoApp.config(['$httpProvider', function ($httpProvider) {
  $httpProvider.interceptors.push('TokenInterceptor');
}]);

todoApp.run(['$rootScope', '$location', '$state', '$window', 'SessionService', function($rootScope, $location, $state, $window, SessionService) {
  $rootScope.$on("$stateChangeStart", function(event, toState, toStateParams) {
    if(!SessionService.isLoggedIn && !$window.sessionStorage.token) {
      $location.path("/login");
    }
  });
}]);