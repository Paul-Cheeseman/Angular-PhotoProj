angular.module('RouteControllers', [])

    .controller('HomeController', function($scope, LocalUserStore){
        $scope.title = "Welcome to Angular";
        
    })



    //Creating a controller for Register page, passing in $scope variable
    .controller('RegisterController', function($scope, LocalUserStore) {

        //console.log("hello register");

        //creating a empty object on $scope
        $scope.registrationUser = {};


        //As submit form is to be used by the register template, it needs to be bound to the $scope object so that
        //the register template can access it
        $scope.submitForm = function() { 

            if ($scope.registrationForm.$valid) {

                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;

                //Grab the data stored locally in JSON format through the service LocalUserStore, which uses an async promise
                //to kick off the fetch, and 'then' start an annonymous function afterwards
                LocalUsers.fetch().then(function(results) {
                    //*******************************************************************
                    //DO I NEED TO USE SCOPE HERE AS I AM NOT PASSING VALUES TO TEMPLATE?
                    $scope.users = results.data;
                    //*******************************************************************
                    $scope.users.forEach(function(entry) {
                        console.log(entry.name);
                        console.log($scope.registrationUser.username);                        
                        if (entry.name == $scope.registrationUser.username){
                            console.log("Name match on: " + entry.name + " and " + $scope.registrationUser.username);
                        }
                        if (entry.password == $scope.registrationUser.password){
                            console.log("Password match on: " + entry.password + " and " + $scope.registrationUser.password);
                        }
                        //else                        
                        //    console.log("No match made");                            
                    });
                    //console.dir($scope.users);
                    //console.dir($scope.users[0].name);
                })
            }
        }        

        /*
        $scope.submitForm = function() {
            if ($scope.registrationForm.$valid) {
                //Setting values in object (on $scope) to be the same as those created in reg form template
                //Again values from template being passed to controller need to be accessed via $scope
                $scope.registrationUser.username = $scope.user.username;
                $scope.registrationUser.password = $scope.user.password;
            }
            console.log($scope.registrationUser.username + " " + $scope.registrationUser.password);
        }
        */
    });