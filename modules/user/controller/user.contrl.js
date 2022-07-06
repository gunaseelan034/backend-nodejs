const db = require("../../../lib/connection");
const responseSender = require("../../../responsesender/index");
const User = db.user;

//  create user
exports.createUser = async (req, res) => {
  console.log(req.body, "e3efweew");
  let data = {
    email: req.body.email,
    mobile: req.body.mobile,
    relevent_type: req.body.relevent_type,
  };

  let father = {};
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
  } else if (data.relevent_type === "Father") {
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
  }
};
