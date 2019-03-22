
angular.module('myApp')
    .service('AuthService', ['$sessionStorage', function ($sessionStorage) {
        let auth = {
            isAuthenticated() {
                return $sessionStorage.currentUser || false;
            }
        };
        return auth;
    }]);
