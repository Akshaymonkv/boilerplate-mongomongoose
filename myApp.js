require('dotenv').config();
let Mongoose = require('mongoose')



let personSchema = new Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
})

let Person = Mongoose.model('Person',personSchema)

Mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true})
//MONGO_URI
const createAndSavePerson = (done) => {

//creating an object instance fot the Person object model
  var newP = new Person({
    name: "Akshay",
    age: 25,
    favoriteFoods: ["dosa","Idli"]
  })
    
//save method is used to save an object to the database
  newP.save(function(err,data){
    if(err)return console.log(err)
      done(null, data);
  })
};

const createManyPeople = (arrayOfPeople, done) => {
//if we are going to create multiple entries into the database we can feed them as an array of object and we can use Model.create()
  Person.create(arrayOfPeople,(err,data)=>{
    if(err) return done(err)
      done(null,data);
  })
};

const findPeopleByName = (personName, done) => {
//To find a single value in it, in this case we can see personName is given as an object and not string because our document has objects with "name" in it to match this to
  Person.find({name: personName},(err,data)=>{
    if(err) return done(err)
      done(null,data);
  })
 // done(null /*, data*/);
};

const findOneByFood = (food, done) => {
  done(null /*, data*/);
};

const findPersonById = (personId, done) => {
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
