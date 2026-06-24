const Pet = require('../models/pet.model');

module.exports.index = (request, response) => {
    response.json({ message: "Pet Shelter Exam Full Stack CRUD Applicaiton "})
}

module.exports.getAllPets = (request, response) => {
    Pet.find({})
    .then(pets => response.json(pets))
    .catch(err => response.status(400).json({err}))
}

module.exports.createPet = (request, response) => {
    Pet.create(request.body)
    .then(pet => response.json(pet))
    .catch(err => response.status(400).json({err}))
}

module.exports.getOnePet = (request, response) => {
    Pet.findOne({ _id: request.params.id })
    .then(onePet => response.json(onePet))
    .catch(err => response.status(400).json({err}))
}

module.exports.updatePet = (request, response) => {
    Pet.findOneAndUpdate({ _id: request.params.id }, request.body, {new: true, runValidators: true})
    .then(updatedPet => response.json(updatedPet))
    .catch(err => response.status(400).json({err}))
}

module.exports.deletePet = (request, response) => {
    Pet.deleteOne({ _id: request.params.id })
    .then(deletedPet => response.json(deletedPet))
    .catch(err => response.status(400).json({err}))
}