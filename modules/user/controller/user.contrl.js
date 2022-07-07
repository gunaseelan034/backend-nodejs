const uuid = require("uuid");
const uuidv4 = uuid.v4();
const dataParser = require("../../../dataparser/index");
const db = require("../../../lib/connection");

const User = db.user;

exports.createUser = async (req, res) => {
  console.log(JSON.stringify(req.body) + "is recieved");

  let data = {
    email: req.body.email,
    mobile: req.body.mobile,
    relevant_type: req.body.relevant_type,
    uuid: uuidv4,
  };

  // generel type
  if (data.relevant_type === "General") {
    await User.create(data)
      .then((resp) => {
        res.status(200).send({
          success: true,
          message: "Successfully Created",
          data: resp,
        });
      })
      .catch((err) => {
        res.status(400).send({
          success: false,
          message: err,
          data: null,
        });
      });
  }

  //Father As Alumini
  else {
    if (typeof req.body.alumini_details !== "undefined") {
      data = { ...data, alumini_details: req.body.alumini_details };

      await User.create(data)
        .then((resp) => {
          res.status(200).send({
            success: true,
            message: "Successfully Created",
            data: resp,
          });
        })
        .catch((err) => {
          res.status(400).send({
            success: false,
            message: err,
            data: null,
          });
        });
    } else {
      res.status(400).send({
        success: false,
        message: "Alumini details is required",
        data: null,
      });
    }
  }
};

//get user all
exports.getUser = async (req, res) => {
  await User.findAll()
    .then((resp) => {
      for (let i = 0; i < resp.length; i++) {
        let alumini_details = dataParser.dataParser(resp[i].alumini_details);
        resp[i].alumini_details = alumini_details;
        resp[i].alumini_details = alumini_details;
      }
      res.status(200).send({
        success: true,
        message: null,
        data: resp,
      });
    })
    .catch((err) => {
      res.status(400).send({
        success: true,
        message: null,
        data: err,
      });
    });
};
