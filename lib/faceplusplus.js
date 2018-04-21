if (window.location.hostname === "") {
    jQuery.ajaxPrefilter(function(options) {
        if (options.crossDomain && jQuery.support.cors) {
            options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });
}

// this function will accept a pet image url and human base64 image and run two $.ajax() calls
function comparePetImageToHumanBase64(petImage, humanImageBase64) {
    humanImageBase64 = humanImageBase64.slice(22);

	var api_key = "CFWZghQ0PWQLiygcvyxy7FE0b_B4sbGj";
	var api_secret = "iwZJa7Tk-cX9F2R7rDVpgVJTOVZkGYVp"
    //detect url
    var detectURL =  "https://api-us.faceplusplus.com/facepp/v3/detect";
    //data object

    var humanRequest = $.ajax({
        url: detectURL,
        method: "POST",
        data: {
            image_base64: humanImageBase64, 
            return_landmark: 1,
            api_key: api_key,
            api_secret: api_secret,
            return_attributes: 'emotion,age,gender'
        },
    });

    var petRequest = $.ajax({
        url: detectURL,
        method: "POST",
        data: {
            image_url: petImage, 
            return_landmark: 1,
            api_key: api_key,
            api_secret: api_secret,
            return_attributes: 'emotion,age,gender'
        },
    });

    return $.when(humanRequest, petRequest)
    .then(function(humanResponse, petResponse) {
        humanResponse = humanResponse[0]; // jQuery returns a 3 part array :\
        petResponse = petResponse[0]; // jQuery returns a 3 part array :\

        var human;
        var pet;
        var analysis;

        if (petResponse.faces.length > 0) {
            pet = {
                age: petResponse.faces[0].attributes.age.value,
                gender: petResponse.faces[0].attributes.gender.value,
                emotion: getProminantEmotion(petResponse.faces[0].attributes.emotion),
            };
        }

        if (humanResponse.faces.length > 0) {
            human = {
                age: humanResponse.faces[0].attributes.age.value,
                gender: humanResponse.faces[0].attributes.gender.value,
                emotion: getProminantEmotion(humanResponse.faces[0].attributes.emotion),
            };
        }

        return {
            human: human,
            pet: pet,
        }
    });

    function getProminantEmotion(emotions) {
        return Object.keys(emotions).reduce(function(a, b) { 
            return emotions[a] > emotions[b] ? a : b 
        });
    }

}


 
