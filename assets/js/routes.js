const TEMPLATE_DIR = 'partials';


angular.module('myApp')
    .config(config)
    .run(run);




function config($stateProvider, $locationProvider, $urlRouterProvider) {

    $stateProvider
        .state('first', {
            abstract: true,
            url: '',
            authenticate: true,
            templateUrl: TEMPLATE_DIR + "/basic-layout.html",
        })
        .state('hello', {
            //name: 'hello',
            url: '/',
            parent: 'first',
            templateUrl: TEMPLATE_DIR + "/home.html"
        })
        .state('article', {
            // name: 'article',
            url: '/articles',
            parent: 'first',
            templateUrl: TEMPLATE_DIR + "/article.html",
            controller: 'articleCtrl'
        })
        .state('add_article', {
            //name: 'add_article',
            url: '/addArticle',
            parent: 'first',
            templateUrl: TEMPLATE_DIR + "/article_add.html",
            controller: 'articleCtrl'
        })
        .state({
            parent: 'first',
            name: 'edit_article',
            url: '/editArticle',
            templateUrl: TEMPLATE_DIR + "/article_add.html",
            controller: 'articleEditCtrl'

        })
        .state({
            parent: 'first',
            name: 'gallery',
            url: '/gallery',
            templateUrl: TEMPLATE_DIR + "/gallery.html",
            controller: 'galleryListCtrl'
        })
        .state({
            parent: 'first',
            name: 'gallery_add',
            url: '/gallery_add',
            templateUrl: TEMPLATE_DIR + "/gallery_add.html",
            controller: 'galleryAddCtrl'
        })
        .state({
            parent: 'first',
            name: 'gallery_edit',
            url: '/gallery_edit',
            templateUrl: TEMPLATE_DIR + "/gallery_add.html",
            controller: 'galleryEditCtrl'
        })
        .state('login-layout', {
            abstract: true,
            url: '',
            templateUrl: TEMPLATE_DIR + "/login_layout.html",
        })
        .state({
            name: 'login',
            url: '/login',
            parent: 'login-layout',
            templateUrl: TEMPLATE_DIR + "/login.html",
            controller: 'loginCtrl'
        });

    $urlRouterProvider.otherwise('/');


    $locationProvider.html5Mode(true);

}

function run ($rootScope, $state, AuthService) {
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
      if (toState.authenticate && !AuthService.isAuthenticated()){
        // User isn’t authenticated
        $state.transitionTo("login");
        event.preventDefault(); 
      }
    });
  }

/*function run($rootScope, $state, $sessionStorage, $http, $location) {*/

    // $rootScope.global = $cookieStore.get('globals') || {};
    // if ($rootScope.globals.currentUser) {
    //     $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    // }

    // keep user logged in after page refresh

   /*
    if ($sessionStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $sessionStorage.currentUser.token;
    }
    */


    // redirect to login page if not logged in and trying to access a restricted page
    /*
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$sessionStorage.currentUser) {
            $location.path('/login');
        }
    });
    
} */