const express = require("express");
var mongo = require("mongodb").MongoClient;
const { MongoClient } = require("mongodb");
var ObjectId = require("mongodb").ObjectID;
var cors = require("cors");
var jwt = require("jsonwebtoken");
var app = express();
var port = 8000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongo.connect("mongodb://localhost:27017/Note", function (err, server) {
  if (err) {
    console.log("connection error " + err);
  } else {
    app.post("/get_notes", (req, res) => {
      if (req.body.hasOwnProperty("limit") &&
        req.body.hasOwnProperty("skip")) {
        var users = [];
        var cursor = server.db().collection("notes").find({}).
          limit(parseInt(req.body.limit)).
          skip(parseInt(req.body.skip));

        cursor.forEach(function (doc, err2) {
          if (!err2) {
            users.push(doc);
          }
        }, function () {
          if (users.length === 0) {
            res.json({ status: false, message: "No data in collection" });
          } else {
            res.json({ status: true, result: users });
          }
        })
      } else {
        res.json({ status: false, message: "some params are missing" });
      }
    })

    app.post("/add_note", (req, res) => {
      if (
        req.body.hasOwnProperty("subject") &&
        req.body.hasOwnProperty("note") 
      ) {
        var userData = {
          subject: req.body.subject,
          note: req.body.note,
        }
        server.db().collection("notes").insertOne(userData, (err1, result) => {
          if (err1) {
            res.json({ status: false, message: "note could not be added" });
          } else {
            res.json({ status: true, message: "note has been added", output: result });
          }
        })
      } else {
        res.json({ status: false, message: "some params missing" });
      }
    })
    app.post("/delete_note", (req, res) => {
      if (req.body.hasOwnProperty("subject")) {
        var note = req.body;
        server
          .db()
          .collection("notes")
          .deleteOne(note, (err2, result) => {
            if (err2) {
              res.json({
                status: false,
                message: "Couldn't delete the subject" + err2,
              });
            } else {
              res.json({ status: true, message: "Note deleted successfully." });
              console.log(result);
            }
          });
      } else {
        res.json({ status: false, message: "Some params are missing." });
      }
    });

    app.post("/update_note", (req, res) => {
      if (req.body.hasOwnProperty("subject")) {
        var subject = req.body.subject;
        var note = {
          note : req.body.note,
        };
        // console.log(id);
        console.log(note);
        server
          .db()
          .collection("notes")
          .updateOne({ subject : subject }, { $set: note }, (err2) => {
            if (err2) {
              res.json({
                status: false,
                message: "Couldn't update the subject" + err2,
              });
            } else {
              res.json({
                status: true,
                message: "Document updated successfully.",
              });
              // console.log(result);
            }
          });
      } else {
        res.json({ status: false, message: "Some params are missing." });
      }
    });

  }
})

app.get("/", (req, res) => {
  res.send("welcome to express project");
})

app.get("/check", (req, res) => {
  console.log(req.query);
  res.send("HI " + req.query.name);
})

app.listen(port, () => {
  console.log("app is running on port " + port);
});