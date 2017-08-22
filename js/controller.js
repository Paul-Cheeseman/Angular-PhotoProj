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



    .controller('ContactController', function($scope, NgMap) {

        $scope.firstNameText = "Your first name is required";
        $scope.lastNameText = "Your last name is required";
        $scope.dateText = "A start date with 2 days lead time is required";
        $scope.emailText = "Your email is required";
        $scope.phoneText = "An 11 digit phone number is required";

        var nameRegEx;
        var nameStr;
        var emailRegEx;
        var emailStr;

        //Text underneath each text box
        $scope.msgTextColour = {"color": "grey"};


        $scope.googleMapsUrl = "https://maps.googleapis.com/maps/api/js?key=AIzaSyCv5r-mFuGlcKY1QraqB4LYIAiLbfM5kKE&";

        $scope.submitForm = function() {

            var submit = true;

            //Name RegEx for form validation
            firstNameRegEx = /^([^0-9]*)[A-Za-z]{2,}$/;
            firstNameStr = $scope.contactForm.firstName;
            //Need undefined below as it is included as a legitimate match in the A-Za-z regex so triggers if nothing in form
            if (firstNameRegEx.test(firstNameStr.$modelValue) && firstNameStr.$modelValue !== undefined) {

                //console.log("First name match!");
                $scope.firstNameText = "";
            } else {

                $scope.msgTextColour = {"color": "red"};
                $scope.firstNameText = "Please enter your first name, it needs to be at least 2 alphabetic characters";
                submit = false;                
            }


            //Name RegEx for form validation
            lastNameRegEx = /^([^0-9]*)[A-Za-z]{2,}$/;
            lastNameStr = $scope.contactForm.lastName;
            //Need undefined below as it is included as a legitimate match in the A-Za-z regex so triggers if nothing in form
            if (lastNameRegEx.test(lastNameStr.$modelValue) && lastNameStr.$modelValue != undefined) {

                //console.log("Last name match!");
                $scope.lastNameText = "";
            } else {

                $scope.msgTextColour = {"color": "red"};
                $scope.lastNameText = "Please enter your last name, it needs to be at least 2 alphabetic characters";
                submit = false;                                
            }


            //Email regex
            emailRegEx = /[^\s@]+@[^\s@]+\.[^\s@]+/;
            emailStr = $scope.contactForm.email;
            if (emailRegEx.test(emailStr.$modelValue)) {
                $scope.emailText = "";
                //console.log("email match!");
            } else {
                $scope.msgTextColour = {"color": "red"};                
                $scope.emailText = "Incorrect email format, please re-enter";
                submit = false;                
            }


            startDateRegEx = /^[0-9]{1,2}\/[0-9]{1,2}\/[0-9]{4}$/;
            startDateStr = $scope.contactForm.startDate;
           //Rather than using Regex (which would become quite complex) using moment library to check date is valid
            var dateOK = moment($scope.contactForm.startDate.$modelValue, "DD/MM/YYYY");
            //Amount of gap between current date and requested start date
            var leadTime = 2;


            if (dateOK.isValid() && startDateRegEx.test(startDateStr.$modelValue)) {
                //Date with lead time
                var leadTimeDate = moment().add(leadTime, 'days');
                var currentDate = moment($scope.contactForm.startDate.$modelValue, "DD/MM/YYYY");
                if (currentDate >= leadTimeDate) {
                    $scope.dateText = "";
                } else {
                    $scope.msgTextColour = {"color": "red"};                    
                    $scope.dateText = "Please ensure the date is " + 2 + " days after current date";
                    submit = false;                                    
                }

            } else {
                $scope.dateText = "Incorrect date - Ensure it's valid and entered as DD/MM/YYYY";
                submit = false;                
            }


            //Phone regex - 11 seems to be mobile/landline length
            phoneRegEx = /(^[A-Za-z]*)[0-9]{11}$/;
            phoneStr = $scope.contactForm.phone;
            if (phoneRegEx.test(phoneStr.$modelValue)) {
                $scope.phoneText = "";
            } else {
                $scope.msgTextColour = {"color": "red"};                
                $scope.phoneText = "Incorrect phone number format, please re-enter 11 digit number";
                submit = false;                
            }

            $scope.contactForm.$setPristine();

            if (submit){
                window.alert("Msg to show form validated and can be submitted");
            }
        };
    });


