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
  console.log(food)
  //to find a single element in the array of objects
  Person.findOne({favoriteFoods:[food]},(err,data)=>{
    if(err) return done(err)
    done(null, data);
  })

};

const findPersonById = (personId, done) => {
  console.log(personId)
  //to find an element by their id exactly
  Person.findById({_id: personId},(err,data)=>{
    if(err) return done(err)
    done(null, data);
  })

};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id: personId},(err,person)=>{
      if (err) return done(err)
      person.favoriteFoods.push(foodToAdd)
      person.save((err,updatedPerson)=>{      
      console.log(updatedPerson)
      done(null ,updatedPerson );

      })

  })

};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOne({name: personName},(err,person)=>{
    if(err) return done(err)
//    console.log(person)
    person.age = ageToSet
    person.save((err,updatedPerson)=>{
      if(err)return done(err)
      console.log("Updated person",updatedPerson)
    })
      done(null,person);
  })


};
//to remove an id 
const removeById = (personId, done) => {
  Person.findById({_id:personId},(err,person)=>{
    console.log(person)
    person.remove()
    done(null, person);
  })

};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove},(err,data)=>{
    if(err)return done(err)
      done(null, data); 
  })


};
//To find documents based on a value and then to chain the queries sort to sort out based on name, limit to limit the search upto two documents and exec to execute all the queries together
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select('-age').exec((err,data)=>{
    done(null , data);
  })
  

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
