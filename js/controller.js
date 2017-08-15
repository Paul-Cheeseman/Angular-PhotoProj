angular.module('RouteControllers', [])

    .controller('HomeController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular";

    })

    .controller('ProfileController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular - Profile Page";

    })

    .controller('MediaController', function($scope, LocalUserStore) {
        $scope.title = "Welcome to Angular - Media Page";


        document.getElementById("nextPhotoBtnLg").disabled = true;
        document.getElementById("previousPhotoBtnLg").disabled = true;


        //create the Swanage gallery array
        swanageGallery = [{
                src: "img/Swanage/Swanage1.jpg",
                alt: "Swanage: Sea with coast in distance"
            },

            {
                src: "img/Swanage/Swanage2.jpg",
                alt: "Swanage: Island at Sunset no.1"
            },

            {
                src: "img/Swanage/Swanage3.jpg",
                alt: "Swanage:  Island at Sunset no.2"
            },

            {
                src: "img/Swanage/Swanage4.jpg",
                alt: "Swanage: Island in distance bright sun"
            },

            {
                src: "img/Swanage/Swanage5.jpg",
                alt: "Swanage: Coastal cliffs with sea"
            },

            {
                src: "img/Swanage/Swanage6.jpg",
                alt: "Swanage: Coastal cliffs inland"
            },

            {
                src: "img/Swanage/Swanage7.jpg",
                alt: "Swanage: Bay from up high no.1"
            },

            {
                src: "img/Swanage/Swanage8.jpg",
                alt: "Swanage: Bay from up high no.2"
            },

            {
                src: "img/Swanage/Swanage9.jpg",
                alt: "Swanage: Coastal view with bench"
            },

            {
                src: "img/Swanage/Swanage10.jpg",
                alt: "Swanage: High up long coastal view"
            },

            {
                src: "img/Swanage/Swanage11.jpg",
                alt: "Swanage: Sea view with clouds"
            }
        ];

        //create the Fleet Gallery array
        fleetGallery = [{
                src: "img/Fleet/FleetPond1.jpg",
                alt: "Fleet: Forrest in sun"
            },

            {
                src: "img/Fleet/FleetPond2.jpg",
                alt: "Fleet: Bridge over pond"
            },

            {
                src: "img/Fleet/FleetPond3.jpg",
                alt: "Fleet: Close up cobweb"
            },

            {
                src: "img/Fleet/FleetPond4.jpg",
                alt: "Fleet: Pond through trees no.1"
            },

            {
                src: "img/Fleet/FleetPond5.jpg",
                alt: "Fleet: Pond at sunset"
            },

            {
                src: "img/Fleet/FleetPond6.jpg",
                alt: "Fleet: Pond at sunset with sun showing"
            },

            {
                src: "img/Fleet/FleetPond7.jpg",
                alt: "Fleet: Pond viewing position"
            },

            {
                src: "img/Fleet/FleetPond8.jpg",
                alt: "Fleet: Pond through trees no.2"
            },

            {
                src: "img/Fleet/FleetPond9.jpg",
                alt: "Fleet: Close of up leaves"
            },

            {
                src: "img/Fleet/FleetPond10.jpg",
                alt: "Fleet: Stream in summer"
            },

            {
                src: "img/Fleet/FleetPond11.jpg",
                alt: "Fleet: Waterlogged in spring"
            }
        ];



        //create the Caesars Camp gallery array
        caesarsCampGallery = [{
                src: "img/CaesarsCamp/CaesarsCamp1.jpg",
                alt: "Caesars Camp: Sunset view no.1"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp2.jpg",
                alt: "Caesars Camp: Sunset view no.1"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp3.jpg",
                alt: "Caesars Camp: Sunset view with tree"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp4.jpg",
                alt: "Caesars Camp: Hill side view"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp5.jpg",
                alt: "Caesars Camp: High up view over trees"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp6.jpg",
                alt: "Caesars Camp: High up view over low land"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp7.jpg",
                alt: "Caesars Camp: High up with top of hill in shot"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp8.jpg",
                alt: "Caesars Camp: High up looking over purple and green"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp9.jpg",
                alt: "Caesars Camp: Autumnal hillside view"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp10.jpg",
                alt: "Caesars Camp: Autumnal view over trees"
            },

            {
                src: "img/CaesarsCamp/CaesarsCamp11.jpg",
                alt: "Caesars Camp: Autumnal path back down"
            }
        ];



        // No functions need to be returned because the html page (or any other JS) doesn't call any, this module runs on page load, then 
        // listens for events, the page doesn't invoke any itself.

        console.log("inside media function inside Controller!");

        $scope.swanageCount = 0;
        $scope.fleetCount = 0;
        $scope.caesarsCampCount = 0;

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