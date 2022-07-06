const uuid = require("uuid");
const uuidv4 = uuid.v4();
const db = require("../../../lib/connection");
const responseSender = require("../../../responsesender/index");
const User = db.user;
const Student = db.student;

exports.createUser = async (req, res) => {
  console.log(req.body)
  let data = {
    email: req.body.email,
    mobile: req.body.mobile,
    relevent_type: req.body.relevent_type,
    uuid: uuidv4,
  };
  let father = {};
  let studentData = req.body.student;

  if (data.relevent_type === "Generel") {
    let user = await User.create(data);
    responseSender(
      res,
      {
        success: true,
        message: "Successfully Created",
        data: user,
      },
      200
    );
  }

  // father as alumini
  else if (data.relevent_type === "Father") {
    if (typeof req.body.father === "undefined") {
      responseSender(
        res,
        {
          success: false,
          message: "Father Details required",
          data: [],
        },
        400
      );
    } else {
      data = {
        ...data,
        father: {
          ...father,
          name: req.body.father.name,
          year_of_passed: req.body.father.year_of_passed,
        },
      };
'yfty'
      let user = await User.create(data);
      studentData = { ...studentData, uuid: data.uuid };
      let student = await Student.create(studentData);
      responseSender(
        res,
        {
          success: true,
          message: "Successfully Created",
          data: { user: user, student: student },
        },
        200
      );
    }
  }
};
