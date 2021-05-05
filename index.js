// Import required module csvtojson and mongodb packages
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

// Establish connection to the database
var url = "mongodb://localhost:27017/SampleDb";
var dbConn;
mongodb.MongoClient.connect(url, {
    useUnifiedTopology: true,
}).then((client) => {
    console.log('DB Connected!');
    dbConn = client.db();
}).catch(err => {
    console.log("DB Connection Error: ${err.message}");
});

// CSV file name
const fileName = "sample.csv";

var arrayToInsert = [];
csvtojson().fromFile(fileName).then(source => {
    // Fetching the all data from each row
    for (var i = 0; i < source.length; i++) {
        var oneRow = {
            firstName: source[i]["Firstname"],
            lastName: source[i]["Lastname"],
            city: source[i]["City"],
            salary: source[i]["Salary"]
        };
        arrayToInsert.push(oneRow);
    }

    //inserting into the table "employees"
    var collectionName = 'employees';
    var collection = dbConn.collection(collectionName);
    collection.insertMany(arrayToInsert, (err, result) => {
        if (err) console.log(err);
        if(result){
            console.log("Import CSV into database successfully.");
        }
    });
});