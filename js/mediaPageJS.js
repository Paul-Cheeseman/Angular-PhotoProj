
/* Creating a module (through the use of function scope) called 'contact' to encapsulate the 
   associated functions and variables, thus eliminating the risk of variable/function pollution 
   in the global scope. In addition it has benefit of grouping all associated code for easier 
   maintainability.
*/





var media = (function (){
// No functions need to be returned because the html page (or any other JS) doesn't call any, this module runs on page load, then 
// listens for events, the page doesn't invoke any itself.

console.log("inside media function");

document.getElementById("nextPhotoBtnLg").disabled = true;
document.getElementById("previousPhotoBtnLg").disabled = true;


//Disable next/previous buttons until a selection is made
if (document.getElementById("nextPhotoBtnLg")){
	document.getElementById("nextPhotoBtnLg").disabled = true;
	document.getElementById("previousPhotoBtnLg").disabled = true;
}

if (document.getElementById("nextPhotoBtnSm")){
	document.getElementById("nextPhotoBtnSm").disabled = true;
	document.getElementById("previousPhotoBtnSm").disabled = true;
}


//Set flag to manage state of next/previous buttons (rather than executing) 
//command to set disabled to false every mouse click. See function 
// getInitialPhotoVals() for clarity.
var previousNextButtonsDisabled = "Yes";


//Initialise Count for array iteration in the Global domain, so 
//that it can be referenced by all functions that need it
var count = 0;


//IF needed so only looks for myImg when on media page
if (document.getElementById("myImg")){
	//Event handler for myImg
	myImg.onclick = function(){
		//Ensures the modal only gets launched when picture in viewer
		if (document.getElementById("nextPhotoBtnLg").disabled === false){
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
if (document.getElementById("modalClose")){
	// When the user clicks on <span> (x), close the modal
	modalClose.onclick = function() { 
	    document.getElementById('myModal').style.display = "none";
	};
}


//Updates Gallary with new image and new text
function updateGallary(){
	document.getElementById("myImg").src=whichGallery[count].src;
	document.getElementById("myImg").alt=whichGallery[count].alt;
}



//Enable use of next and previous buttons by enabling them
function enableNextPrev(){

	//Enable the next/previous buttons
	if (document.getElementById("nextPhotoBtnLg")){
		document.getElementById("nextPhotoBtnLg").disabled = false;
		document.getElementById("previousPhotoBtnLg").disabled = false;
	}

	if (document.getElementById("nextPhotoBtnSm")){
		document.getElementById("nextPhotoBtnSm").disabled = false;
		document.getElementById("previousPhotoBtnSm").disabled = false;
	}
}


//Function to set the selected Gallary's array references to 0
function getInitialPhotoVals(){
	//reset count in case value is higher than current 
	//array (if previous album bigger)
	count = 0;	
	document.getElementById("myImg").src = whichGallery[count].src;
    document.getElementById("myImg").alt = whichGallery[count].alt;	
}


//A function which prepares selected Gallary's references and, if 
//required, enables the Gallary buttons
function initialiseGallary(){
	//Gets initial photo/text ready for viewer, then 
	getInitialPhotoVals();
	if (previousNextButtonsDisabled === "Yes"){
		enableNextPrev();
		previousNextButtonsDisabled = "No";
	}
}



//Function for when the user clicks on 'Next Photo' the next photo is shown
function previousPhotoBtnFunc() { 

	//If reached end of array, go back to start of Array
	//Array starts at 0, so -1 required off length value
	if (count === 0){
		count=(whichGallery.length -1);
	}
	else{
		//cycle to previous photo
	  	count = count -1;
	}

	updateGallary();
}

console.log("Loaded");

// When the user clicks on Next Photo, show next photo
function nextPhotoBtnFunc() { 
	//cycle to next photo
  	count = count +1;

	//If reached end of array, go back to start
	if (count === whichGallery.length){
		count=0;
	}
	updateGallary();
}


//Function for when the user clicks on 'Next Photo' the next photo is shown
//IF needed so only looks for myImg when on media page
if (document.getElementById("previousPhotoBtnLg")){
	previousPhotoBtnLg.onclick = previousPhotoBtnFunc;
	previousPhotoBtnSm.onclick = previousPhotoBtnFunc;
}


//IF needed so only looks for myImg when on media page
if (document.getElementById("nextPhotoBtnLg")){
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
if (document.getElementById("swanageBtnLg")){
	console.log("here");
	swanageBtnLg.onclick = swanageBtnFunc;
	swanageBtnSm.onclick = swanageBtnFunc;
	fleetBtnLg.onclick = fleetBtnFunc;
	fleetBtnSm.onclick = fleetBtnFunc;
	caesarsCampBtnLg.onclick = caesarsCampBtnFunc;
	caesarsBtnSm.onclick = caesarsCampBtnFunc;	
}


})();
