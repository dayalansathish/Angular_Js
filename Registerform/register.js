const app = angular.module('registerApp',[]);

app.controller('registerCtrl', function($scope){

    
    $scope.user={};
    $scope.userData= [];
    console.log($scope.user);
    console.log($scope.userData);

    $scope.submitForm = function(){
        if($scope.registerForm.$valid){
            $scope.userData.push({
                fName: $scope.user.fName,
                lName: $scope.user.lName,
                email: $scope.user.email,
                password: $scope.user.password,
                confirmPassword : $scope.user.confirmPassword
            })
            
        }
        console.log($scope.user);
        console.log($scope.userData);

        $scope.user = [];
        $scope.registerForm.$setPristine();
        $scope.registerForm.$setUntouched();
    }

})