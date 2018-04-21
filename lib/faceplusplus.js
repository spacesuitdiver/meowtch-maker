// this function will accept a pet image url and human base64 image and run two $.ajax() calls
   jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });


function comparePetImageToHumanBase64(petImageUrl, humanImageBase64) {
    console.log(humanImageBase64);
    humanImageBase64 = humanImageBase64.slice(22);
  // return $.when($.ajax(), $.ajax())
  // or 
  // return Promise.all([$.ajax(), $.ajax()]);    
    //keys
    // var data2 = data;

	var api_key = "CFWZghQ0PWQLiygcvyxy7FE0b_B4sbGj";
	var api_secret = "iwZJa7Tk-cX9F2R7rDVpgVJTOVZkGYVp"
    //detect url
    var detectURL =  "https://api-us.faceplusplus.com/facepp/v3/detect";
    //data object
    var personData = {
    	'image_base64': humanImageBase64, 
    	'return_landmark': 1,
        'api_key': api_key,
        'api_secret': api_secret,
        'return_attributes': 'emotion,age,gender'
    };

    var personRequest = $.ajax({
        url: detectURL,
        method: "POST",
        data: personData,
    });

    var personData = {
        'image_url': petImageUrl, 
        'return_landmark': 1,
        'api_key': api_key,
        'api_secret': api_secret,
        'return_attributes': 'emotion,age,gender'
    };

    var catRequest = $.ajax({
        url: detectURL,
        method: "POST",
        data: personData,
    });
        
    
    return $.when(personRequest, catRequest)
    .then(function(personRes, catRes) {
        console.log(personRes, catRes);
    });


}


 