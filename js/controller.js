angular.module('RouteControllers', [])

    .controller('HomeController', function($scope) {
        $scope.title = "Welcome to Angular";

    })

    .controller('ProfileController', function($scope) {
        $scope.title = "Welcome to Angular - Profile Page";

    })


    .controller('MediaController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular - Media Page";

        //Putting on global scope to share with view
        $scope.placeName; //Location photographs taken, user interaction sets first value
        $scope.currentImage = "img/initialPhotoViewerPic.jpg"; //Pointer to current img, user interaction sets first vlue
        $scope.disableNavigation = true;
        $scope.modalAppear = { 'display': "none" };

        //Local variables to keep within controller
        var swanageImgCount = 0;
        var fleetImgCount = 0;
        var caesarsCampImgCount = 0;
        var currentLocation;
        var album;
        var photoNum;

        //Pull in the data from a json file, ideally this would be data from an API but as replicating other site, json file used
        LocalUsers.fetch().then(function(results) {
            album = results.data;

            /*
            for (i = 0; i < album.length; i++) {
                console.log(album[i].place);
                //if place == variable


                for (j = 0; j < album[i].photos.length; j++) {
                    //load into own albums

                    console.log(album[i].photos[j].src);
                }

                //break
            }
            */
        });


        $scope.initialiseNewPic = function(location) {
            $scope.disableNavigation = false;
            for (i = 0; i < album.length; i++) {
                if (album[i].place == location) {
                    if (album[i].place == "swanage") {
                        $scope.currentImage = album[i].photos[swanageImgCount].src;
                        $scope.currentCaption = album[i].photos[swanageImgCount].alt;
                    } else if (album[i].place == "fleet") {
                        $scope.currentImage = album[i].photos[fleetImgCount].src;
                        $scope.currentCaption = album[i].photos[fleetImgCount].alt;
                    } else if (album[i].place == "caesarsCamp") {
                        $scope.currentImage = album[i].photos[caesarsCampImgCount].src;
                        $scope.currentCaption = album[i].photos[caesarsCampImgCount].alt;
                    }
                    //Prevent any unnecessary looping
                    currentLocation = location;
                    break;
                }
            }
            console.log($scope.currentImage);
            console.log($scope.currentCaption);
        };



        $scope.setNewPic = function(direction) {
            for (i = 0; i < album.length; i++) {
                if (album[i].place == currentLocation) {
                    if (album[i].place == "swanage") {
                        if (direction == "forwards") {
                            swanageImgCount = swanageImgCount + 1;
                            if (swanageImgCount == album[i].photos.length) {
                                swanageImgCount = 0;
                            }
                        } else if (direction == "backwards") {
                            swanageImgCount = swanageImgCount - 1;
                            if (swanageImgCount < 0) {
                                swanageImgCount = album[i].photos.length - 1;
                            }
                        }
                        $scope.currentImage = album[i].photos[swanageImgCount].src;
                        $scope.currentCaption = album[i].photos[swanageImgCount].alt;


                    } else if (album[i].place == "fleet") {
                        if (direction == "forwards") {
                            fleetImgCount = fleetImgCount + 1;
                            if (fleetImgCount == album[i].photos.length) {
                                fleetImgCount = 0;
                            }
                        } else if (direction == "backwards") {
                            fleetImgCount = fleetImgCount - 1;
                            if (fleetImgCount < 0) {
                                fleetImgCount = album[i].photos.length - 1;
                            }
                        }
                        $scope.currentImage = album[i].photos[fleetImgCount].src;
                        $scope.currentCaption = album[i].photos[fleetImgCount].alt;



                    } else if (album[i].place == "caesarsCamp") {
                        if (direction == "forwards") {
                            caesarsCampImgCount = caesarsCampImgCount + 1;
                            if (caesarsCampImgCount == album[i].photos.length) {
                                caesarsCampImgCount = 0;
                            }
                        } else if (direction == "backwards") {
                            caesarsCampImgCount = caesarsCampImgCount - 1;
                            if (caesarsCampImgCount < 0) {
                                caesarsCampImgCount = album[i].photos.length - 1;
                            }
                        }
                        $scope.currentImage = album[i].photos[caesarsCampImgCount].src;
                        $scope.currentCaption = album[i].photos[caesarsCampImgCount].alt;
                    }
                    //prevent any unnecessary looping
                    break;
                }
            }
            console.log($scope.currentImage);
            console.log($scope.currentCaption);
        };


        $scope.modalClose = function() {
            $scope.modalAppear = { "display": "none" };
        };


        $scope.modalLaunch = function() {

            //Ensures the modal only gets launched when picture in viewer
            if ($scope.disableNavigation === false) {


                $scope.modalAppear = {
                    "display": "block",
                    "position": "fixed",
                    "z-index": 1,

                    "padding-top": "50px",
                    /* Location of the box */
                    "left": 0,
                    "top": 0,
                    "width": "100%",
                    /* Full width */
                    "height": "100%",
                    /* Full height */
                    "overflow": "auto",
                    /* Enable scroll if needed */
                    "background-color": "rgb(0,0,0)",
                    /* Fallback color */
                    "background-color": "rgba(0,0,0,0.9)" /* Black w/ opacity */
                };
            }

        };
    })



    .controller('ContactController', function($scope, LocalUserStore) {


        $scope.submitForm = function() {
            console.log("Form Submitted");

            console.log("hello");

            pattern = /^([^0-9]*)[A-Za-z]{2,}$/;

            var str = $scope.contactForm.firstName;
            console.log(str.$modelValue);
            if (pattern.test(str.$modelValue)) {
                console.log("match!");
            }


            /*
            var firstNameStr = $scope.user.firstName;
            var lastNameStr = $scope.user.lastName;
            var emailStr = $scope.user.email;
            var startDateStr = $scope.user.startDate;
            var phoneStr = $scope.user.phone;



            if (firstNameStr.test("")) {

            }
    
    



            //$scope.regex = '/^([A-Za-z]{2,})/';


            //If the first two characters are upper of lower case 
            str = $scope.contactForm.user.firstName;
            if (/^([A-Za-z]{2,})/.test(str)) {
                console.log("match!");
            }

            /*
            if (/^[A-Za-z]{2,}/.test($scope.contactForm.firstName)) {
                console.log("pass");
                //$scope.contactForm.user.firstName = "blah";
            }
            */
            //check each component of form
            console.log("First Name: " + $scope.user.firstName);
            console.log("Last Name: " + $scope.user.lastName);
            //console.log(contactForm.user.firstName);

            //Finish with, details in correct format entered


        };

    });