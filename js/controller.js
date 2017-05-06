angular.module('RouteControllers', [])

    .controller('HomeController', function($scope, LocalUserStore){
        $scope.title = "Welcome to Angular";
        
        //Grab the data stored locally in JSON format through the service LocalUserStore, which uses an async promise
        //to kick off the fetch, and 'then' start an annonymous function afterwards
        LocalUsers.fetch().then(function(results) {
            $scope.users = results.data;

            //------------------------------------------------------------------
            //------------------------------------------------------------------
            //GETTING THE REFERENCE TO THE READ IN OBJECT
            //------------------------------------------------------------------
            //------------------------------------------------------------------
            console.dir($scope.users);
            console.dir($scope.users[0].name);
        })

    })



    //Creating a controller for Register page, passing in $scope variable
    .controller('RegisterController', function($scope, LocalUserStore) {

        console.log("hello register");

        //creating a empty object on $scope
        $scope.registrationUser = {};
 

        //Grab the data stored locally in JSON format through the service LocalUserStore
        LocalUsers.fetch().then(function(data) {
            $scope.users = data;

            //------------------------------------------------------------------
            //------------------------------------------------------------------
            //GETTING THE REFERENCE TO THE READ IN OBJECT
            //------------------------------------------------------------------
            //------------------------------------------------------------------
            console.dir($scope.users);
            console.log($scope.users.people[0]);
            console.log("Username: " + $scope.users);
        })
        

        //As submit form is to be used by the register template, it needs to be bound to the $scope object so that
        //the register template can access it.
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                //Setting values in object (on $scope) to be the same as those created in reg form template
                //Again values from template being passed to controller need to be accessed via $scope
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
            }
            console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
        }
    });