var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// module.exports = mongoose.connect(url,{useNewUrlParser:true})
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Demo");
    var myobj = [{ name: "sudha",  email: "sudha@gmail.com",address: "Bihar" },{ name: "seema",  email: "seema@gmail.com",address: "Bihar" },
    { name: "megha",  email: "megha@gmail.com",address: "Delhi" },{ name: "anchal",  email: "anchal@gmail.com",address: "Bihar" }];
    dbo.collection("details").insertMany(myobj, function(err, res) {
      if (err) throw err;
      console.log("Number of documents inserted: " + res.insertedCount," document inserted");
      db.close();
    });
  });

//   to find one the data

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Demo");
//     dbo.collection("details").findOne({}, function(err, result) {
//       if (err) throw err;
//       console.log(result.name);
//       db.close();
//     });
//   });

// to find alldata

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Demo");
//     dbo.collection("details").find({}).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
//   });

// sort the data
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Demo");
//     var mysort = { name: 1 };
//     dbo.collection("details").find().sort(mysort).toArray(function(err, result) {
//       if (err) throw err;
//       console.log(result);
//       db.close();
//     });
//   });

// delete many data

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("Demo");
    /*Delete all customers where the address starts with an "O":*/
//     var myquery = { name: /^m/ };
//     dbo.collection("details").deleteMany(myquery, function(err, obj) {
//       if (err) throw err;
//       console.log(" document(s) deleted");
//       db.close();
//     });
//   });

// to updateone data with spicific field
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Demo");
    var myquery = { address: "Bihar" };
    var newvalues = { $set: {name: "sudha", address: "Bangelore" } };
    dbo.collection("details").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      db.close();
    });
  });
  