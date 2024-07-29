const app = angular.module('MyApp',[]);
    app.controller('angular', function($scope){
        $scope.firstName = 'Sathish';
        $scope.lastName = '';
        console.log($scope.lastName);
    })
