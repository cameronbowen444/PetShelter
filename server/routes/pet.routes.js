const PetController = require('../controllers/pet.controller');

module.exports = (app) => {
    app.get('/api', PetController.index);
    app.get('/api/pets', PetController.getAllPets);
    app.post('/api/pets', PetController.createPet);
    app.get('/api/pets/:id', PetController.getOnePet);
    app.put('/api/pets/edit/:id', PetController.updatePet);
    app.delete('/api/pets/:id', PetController.deletePet);
}