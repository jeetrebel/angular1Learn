var app = angular.module('myApp');

var articleUrl = "http://localhost:3000/articles/";

app.controller('articleEditCtrl', function ($scope, $http, $state, $stateParams) {

    $scope.darkTheme=false;

    var editId = sessionStorage.getItem("articleID");
    if (!editId) {
        $state.go('article');
        return;
    }

    $scope.articleData = {};
    var getData = {
        method: "get",
        url: articleUrl + editId
    }

    $http(getData).then(r => {
        $scope.articleData = r.data;
    }).catch(e => console.log(e));

    $scope.submitHandler = function () {
        var data = {
            method: "put",
            url: articleUrl + editId,
            data: $scope.articleData,
            headers: { 'Content-Type': 'application/json' }
        }

        $http(data).then(r => {
            $state.go('article');
            return;
        }).catch(e => console.log(e));
    }

})
    .controller('articleCtrl', function ($scope, $http, $state, $stateParams) {

        //article retrive
        $scope.articleGetFunc = function () {
            var getData = {
                method: "get",
                url: articleUrl
            }
            $http(getData).then(r => {
                $scope.articleDataArr = r.data;
            }).catch(e => console.log(e),$scope.dataError="Server Error");

        }


        //delete article
        $scope.articleDel = function (id) {

            var delData = {
                method: "DELETE",
                url: articleUrl + id,
            }

            $http(delData).then(r => {
                $scope.articleGetFunc()
            }).catch(e => console.log(e));
        }


        $scope.submitHandler = function () {
            $scope.articleData.art_modified = new Date();
            $scope.articleData.art_status = 1;
            var data = {
                method: "POST",
                url: articleUrl,
                data: $scope.articleData,
                headers: { 'Content-Type': 'application/json' }
            }

            $http(data).then(r => {
                $state.go('article');
                return;
            }).catch(e => console.log(e));
        }

        $scope.articleGetFunc();


        //article edit
        $scope.articleEdit = function (id) {
            sessionStorage.setItem("articleID", id);
            $state.go('edit_article')

        }




    });
