var app = angular.module('myApp');

app.controller('loginCtrl', ['$scope', '$http', '$state', '$stateParams', '$sessionStorage', function ($scope, $http, $state, $stateParams, $sessionStorage) {

    $scope.user = {};
    $scope.authError = null;

    $scope.login = function () {
        $scope.authError = null;
        // Try to login
        $http.get('api/login', {
            email: $scope.user.email,
            password: $scope.user.password
        })
            .then(function (response) {
                if (!response.data.user) {
                    $scope.authError = 'Email or Password not right';
                } else {
                    $sessionStorage.user = response.data.user;
                    $state.go('article');
                }
            }, function (x) {
                $scope.authError = 'Server Error';
            });
    };


}]);
