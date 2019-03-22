var app = angular.module('myApp');

app.controller('loginCtrl', ['$scope', '$http', '$state', '$stateParams', '$sessionStorage', function ($scope, $http, $state, $stateParams, $sessionStorage) {

    $scope.user = {};
    $scope.authError = null;

    initController();

    function initController() {
        // reset login status
        angular.element(document.querySelector("body")).removeClass("modal-open");
        angular.element(document).find(".modal-backdrop").remove();
        Logout();
    };

    $scope.login = function () {
        $scope.authError = null;
        // Try to login
        $http.post('http://localhost/testapi/login.php', {
            email: $scope.user.email,
            password: $scope.user.password
        })
            .then(function (response) {
                console.log(response.data.token);
                if (!response.data.token) {
                    console.log(response.data.user);
                    $scope.authError = 'Email or Password not right';
                } else {
                    //$sessionStorage.currentUser = $scope.user.email;
                    $sessionStorage.currentUser = { username: $scope.user.email, token: response.data.token };
                    $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                    console.log(response);
                    $state.go('article');
                }
            }, function (rejection) {
                if (rejection.status == 401) {
                    $scope.authError = 'Email or Password not right';
                } else {
                    $scope.authError = 'Server Error';
                }

            });
    };

    function Logout() {
        // remove user from local storage and clear http auth header
        delete $sessionStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }


}]);
