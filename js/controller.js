angular.module('RouteControllers', [])

    .controller('HomeController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular";

    })

    .controller('ProfileController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular - Profile Page";

    })

    .controller('MediaController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular - Media Page";


        //Putting on global scope to share with view
        $scope.placeName; //Location photographs taken, user interaction sets first vlue
        $scope.currentImage = "img/initialPhotoViewerPic.jpg"; //Pointer to current img, user interaction sets first vlue

        $scope.disableNavigation = true;

        var swanageImgCount = 0;
        var fleetImgCount = 0;
        var caesarsCampImgCount = 0;

        var album;
        var photoNum;

        //This is for the disabling of the previous/next until a button is pressed
        //https://stackoverflow.com/questions/34621350/how-can-i-disable-other-buttons-when-i-press-one-button-in-angularjs


        $scope.setNewPic = function(location) {
            $scope.disableNavigation = false;

            for (i = 0; i < album.length; i++) {
                if (album[i].place == location) {
                    if (album[i].place == "swanage") {
                        if (swanageImgCount == album[i].photos.length) {
                            swanageImgCount = 0;
                        }
                        $scope.currentImage = album[i].photos[swanageImgCount].src;
                        $scope.currentCaption = album[i].photos[swanageImgCount].alt;
                        swanageImgCount = swanageImgCount + 1;


                    } else if (album[i].place == "fleet") {
                        if (fleetImgCount == album[i].photos.length) {
                            fleetImgCount = 0;
                        }
                        $scope.currentImage = album[i].photos[fleetImgCount].src;
                        $scope.currentCaption = album[i].photos[fleetImgCount].alt;
                        fleetImgCount = fleetImgCount + 1;



                    } else if (album[i].place == "caesarsCamp") {
                        if (caesarsCampImgCount == album[i].photos.length) {
                            caesarsCampImgCount = 0;
                        }
                        $scope.currentImage = album[i].photos[caesarsCampImgCount].src;
                        $scope.currentCaption = album[i].photos[caesarsCampImgCount].alt;                        
                        caesarsCampImgCount = caesarsCampImgCount + 1;
                    }
                    //prevent any unnecessary looping
                    break;
                }
            }
            console.log($scope.currentImage);
            console.log($scope.currentCaption);            
        };



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

        //Set flag to manage state of next/previous buttons (rather than executing) 
        //command to set disabled to false every mouse click. See function 
        // getInitialPhotoVals() for clarity.
        var previousNextButtonsDisabled = "Yes";


        //Initialise Count for array iteration in the Global domain, so 
        //that it can be referenced by all functions that need it
        var count = 0;


        //IF needed so only looks for myImg when on media page
        if (document.getElementById("myImg")) {
            //Event handler for myImg
            myImg.onclick = function() {
                //Ensures the modal only gets launched when picture in viewer
                if (document.getElementById("nextPhotoBtnLg").disabled === false) {
                    //Set the model to become visable (and take up screen)
                    document.getElementById('myModal').style.display = "block";
                    //Set the viewable photo to be the photo within designated array variable 
                    //whichGallery in position of count
                    document.getElementById("currentPhoto").src = whichGallery[count].src;
                    document.getElementById("caption").innerHTML = whichGallery[count].alt;
                }
            };
        }

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


        //IF needed so only looks for myImg when on media page
        if (document.getElementById("modalClose")) {
            // When the user clicks on <span> (x), close the modal
            modalClose.onclick = function() {
                document.getElementById('myModal').style.display = "none";
            };
        }


        //Updates Gallary with new image and new text
        function updateGallary() {
            document.getElementById("myImg").src = whichGallery[count].src;
            document.getElementById("myImg").alt = whichGallery[count].alt;
        }



        //Enable use of next and previous buttons by enabling them
        function enableNextPrev() {

            //Enable the next/previous buttons
            if (document.getElementById("nextPhotoBtnLg")) {
                document.getElementById("nextPhotoBtnLg").disabled = false;
                document.getElementById("previousPhotoBtnLg").disabled = false;
            }

            if (document.getElementById("nextPhotoBtnSm")) {
                document.getElementById("nextPhotoBtnSm").disabled = false;
                document.getElementById("previousPhotoBtnSm").disabled = false;
            }
        }


        //Function to set the selected Gallary's array references to 0
        function getInitialPhotoVals() {
            //reset count in case value is higher than current 
            //array (if previous album bigger)
            count = 0;
            document.getElementById("myImg").src = whichGallery[count].src;
            document.getElementById("myImg").alt = whichGallery[count].alt;
        }


        //A function which prepares selected Gallary's references and, if 
        //required, enables the Gallary buttons
        function initialiseGallary() {
            //Gets initial photo/text ready for viewer, then 
            getInitialPhotoVals();
            if (previousNextButtonsDisabled === "Yes") {
                enableNextPrev();
                previousNextButtonsDisabled = "No";
            }
        }



        //Function for when the user clicks on 'Next Photo' the next photo is shown
        function previousPhotoBtnFunc() {

            //If reached end of array, go back to start of Array
            //Array starts at 0, so -1 required off length value
            if (count === 0) {
                count = (whichGallery.length - 1);
            } else {
                //cycle to previous photo
                count = count - 1;
            }

            updateGallary();
        }

        console.log("Loaded");

        // When the user clicks on Next Photo, show next photo
        function nextPhotoBtnFunc() {
            //cycle to next photo
            count = count + 1;

            //If reached end of array, go back to start
            if (count === whichGallery.length) {
                count = 0;
            }
            updateGallary();
        }


        //Function for when the user clicks on 'Next Photo' the next photo is shown
        //IF needed so only looks for myImg when on media page
        if (document.getElementById("previousPhotoBtnLg")) {
            previousPhotoBtnLg.onclick = previousPhotoBtnFunc;
            previousPhotoBtnSm.onclick = previousPhotoBtnFunc;
        }


        //IF needed so only looks for myImg when on media page
        if (document.getElementById("nextPhotoBtnLg")) {
            // When the user clicks on Next Photo, show next photo
            nextPhotoBtnLg.onclick = nextPhotoBtnFunc;
            nextPhotoBtnSm.onclick = nextPhotoBtnFunc;
        }




        // Sets view to Swanage photo array and initialises it
        function swanageBtnFunc() {
            console.log("swanage clicked");
            whichGallery = swanageGallery;
            initialiseGallary();
        }

        // Sets view to Fleet photo array and initialises it
        function fleetBtnFunc() {
            console.log("fleet clicked");
            whichGallery = fleetGallery;
            initialiseGallary();
        }

        // Sets view to Caesars Camp photo array and initialises it
        function caesarsCampBtnFunc() {
            console.log("caesarsCamp clicked");
            whichGallery = caesarsCampGallery;
            initialiseGallary();
        }

        // Event handlers being assigned named functions, this is to help
        // reduce amount of duplicate code as both buttons per location
        // are initiating same function.

        //IF needed so only looks for myImg when on media page

        /*
        if (document.getElementById("swanageBtnLg")) {
            console.log("here");
            swanageBtnLg.onclick = swanageBtnFunc;
            swanageBtnSm.onclick = swanageBtnFunc;
            fleetBtnLg.onclick = fleetBtnFunc;
            fleetBtnSm.onclick = fleetBtnFunc;
            caesarsCampBtnLg.onclick = caesarsCampBtnFunc;
            caesarsBtnSm.onclick = caesarsCampBtnFunc;
        }
        */



    })


    .controller('ContactController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular - Contact Page";

    });