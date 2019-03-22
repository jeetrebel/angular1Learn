var app = angular.module('myApp');

app.directive('myActions',function(){

    return {
        restrict: 'E',
        scope: {
            art: '=article'
        },
        template: '<button>{{ art.art_name }} </button>'
    };
});