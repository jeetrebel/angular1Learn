var app = angular.module('myApp');

var galleryUrl = "http://localhost:3000/gallery/";

app.controller('galleryListCtrl', ['$scope', 'galList', 'share', '$state', '$http', function ($scope, galList, share, $state, $http) {

    $scope.title = "Gallery Listing";

    $scope.galDataArr = [];

    $scope.getGallery = function () {
        galList.getData(id = '')
            .then(r => {
                $scope.galDataArr = r.data;

                // $oDate=$scope.galDataArr.map(m => m.gal_modified);
                //$scope.lastMod = $scope.galDataArr.map(m => m.gal_modified).reduce((a, b) => a > b ? a : b, 0);
                $scope.lastMod = $scope.galDataArr.gal_modified.reduce((a, b) => a > b ? a : b, 0);
                //$scope.lastMod = $scope.galDataArr[0].gal_modified;


                $state.go('gallery');
                return;
            }).catch(e => console.log(e));
    }

    console.log($scope);

    $scope.del = function (id) {
        galList.delData(id)
            .then(r => {
                if (r.statusText == 'OK') {
                    $scope.getGallery();
                }
            }).catch(e => console.log(e));
    }

    $scope.edit = function (id) {
        share.setId(id);
        $state.go('gallery_edit');
    }

    $scope.changeStat = function (idx) {

        // console.log( $scope.galDataArr);
        console.log(idx);
        var galID = $scope.galDataArr[idx].id;
        $scope.galDataArr[idx].gal_status = !$scope.galDataArr[idx].gal_status;
        $scope.galDataArr[idx].gal_modified = new Date();
        $scope.lastMod = new Date();
        console.log($scope.galDataArr[idx]);
        console.log(galleryUrl + galID);


        var data = {
            method: "put",
            url: galleryUrl + galID,
            data: $scope.galDataArr[idx],
            headers: { 'Content-Type': 'application/json' }
        }

        $http(data).then(r => {
            console.log(r);
            return;
        }).catch(e => console.log(e));

    }

    $scope.getGallery();







}])


    .controller('galleryAddCtrl', ['$scope', 'fileUpload', '$state', function ($scope, fileUpload, $state) {

        $scope.title = "Gallery Add";

        $scope.uploadFile = function () {
            var file = $scope.myFile;

            var uploadUrl = "save_form.php";
            var data = $scope.galDataArr;
            fileUpload.uploadFileToUrl(file, uploadUrl, data)
                .then(r => {
                    $state.go('gallery');
                    return;
                }).catch(e => console.log(e));

        };

    }])

    .controller('galleryEditCtrl', ['$scope', 'fileUpload', 'galList', 'share', '$state', function ($scope, fileUpload, galList, share, $state) {


        $scope.title = "Gallery Edit";
        $scope.galDataArr = {};
        $scope.gelId = share.getId().galId;

        if (!$scope.gelId) {
            $state.go('gallery');
            return;
        }

        galList.getData($scope.gelId)
            .then(r => {
                $scope.galDataArr = r.data;
            }).catch(e => console.log(e));

        $scope.uploadFile = function () {
            var file = $scope.myFile;
            console.dir(file);

            var data = $scope.galDataArr;

            var uploadUrl = "save_form.php";
            $scope.gal_alt = fileUpload.gal_alt;
            fileUpload.uploadFileToUrl(file, uploadUrl, data)
                .then(r => {
                    console.log("Success");
                    $state.go('gallery');
                    return;
                }).catch(e => console.log(e));

        };


    }])

    // We can write our own fileUpload service to reuse it in the controller
    .service('fileUpload', ['$http', function ($http) {
        this.uploadFileToUrl = function (file, uploadUrl, data) {
            var fd = new FormData();
            fd.append('file', file);
            fd.append('gal_alt', data.gal_alt);
            fd.append('gal_img', (!!data.gal_img == true ? data.gal_img : ''));
            fd.append('gal_desc', data.gal_desc);
            fd.append('id', (!!data.id == true ? data.id : ''));
            fd.append('gal_status', 1);
            fd.append('gal_modified', new Date());
            fd.append('url', galleryUrl);

            return $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined, 'Process-Data': false }
            })
        }
    }])

    .directive('fileModel', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function () {
                    scope.$apply(function () {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    }])


    // We can write our own fileUpload service to reuse it in the controller
    .service('galList', ['$http', function ($http) {
        this.getData = function (id) {
            return $http.get(galleryUrl + id + "?_sort=id&_order=desc")
        },
            this.delData = function (id) {
                return $http.delete(galleryUrl + id)
            }
    }])


    .service('share', function () {

        var sharedId = {};

        this.setId = function (id) {
            sharedId.galId = id;
        }

        this.getId = function () {
            return sharedId
        }

    })





