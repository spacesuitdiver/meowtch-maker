
function getRandomPet(animal) {
	var key ='0cc74d047be677e102b95eec6c78650c';

   return $.ajax({
   	method: 'GET',
   	url: `https://api.petfinder.com/pet.getRandom?format=json&key=${key}&output=full&animal=${animal}&callback=?`,
      dataType: 'json',
   })
   .then(function(response) {
      return {
         name: response.petfinder.pet.name['$t'],
         image: response.petfinder.pet.media.photos.photo[2]['$t'],
         age: response.petfinder.pet.age['$t'],
         gender: response.petfinder.pet.sex['$t'],
      }
   })
}

// getRandomPet('cat').then(console.log).catch(console.error);
