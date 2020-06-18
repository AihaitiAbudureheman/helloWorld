const mongoose = require('mongoose');

const Student = require("../models/Student");

module.exports = app => {
   /**
   * '/add'   ---Route for adding person
   */
  app.post("/add", (req, res) => {
    let newStudent = new Student();
    newStudent.first_name = req.body.first_name;
    newStudent.save((err) => {
      if (err) {
          console.log('Error', err);
      }
      res.send({ message: "Student Added!" });
    });
  });

  /**
   * '/all' --- Route for getting all the persons
   */
  app.get("/all", (req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
            console.log('Error', err);
          }
        return res.json(students);  
      });
  });

}
