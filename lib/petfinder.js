
function getRandomPet(animal) {
	var key ='0cc74d047be677e102b95eec6c78650c';

   return $.ajax({
   	method: 'GET',
   	url: `http://api.petfinder.com/pet.getRandom?format=json&key=${key}&output=full&animal=${animal}`
   })
   .then(function(response) {
   	return response.petfinder.pet.media.photos.photo[2]['$t'];
   			
   			
   })
}

// getRandomPet('cat').then(console.log).catch(console.error);