const dataParser = require("../../../dataparser/index");
const db = require("../../../lib/connection");
const uuid = require("uuid");
const User = db.user;
const Student = db.student;
const Parent = db.parentdetails;
const Address = db.address;

exports.createUser = async (req, res) => {
  console.log(JSON.stringify(req.body) + "is recieved");
  let user = {
    email: req.body.email,
    mobile: req.body.mobile,
    relevant_type: req.body.relevant_type,
    admission_no: req.body.email.slice(0, 4) + uuid.v4().slice(0, 8),
  };
  let student = req.body.student_details;
  let parent = req.body.parent_details;
  let address = req.body.address;

  // generel type
  if (user.relevant_type === "General") {
    User.create(user)
      .then((resp) => {
        // student
        student = { ...student, parent_id: resp.id };
        Student.create(student)
          .then(() => {
            // parent
            parent = { ...parent, parent_id: resp.id };
            Parent.create(parent)
              .then(() => {
                // address
                address = { ...address, parent_id: resp.id };
                Address.create(address)
                  .then((resp) =>
                    res
                      .status(200)
                      .send({ success: true, message: "Successfully Created" })
                  )
                  .catch((err) =>
                    res.status(400).send({ success: false, data: err })
                  );
              })
              .catch((err) =>
                res.status(400).send({ success: false, data: err })
              );
          })
          .catch((err) => res.status(400).send({ success: false, data: err }));
      })
      .catch((err) => res.status(400).send({ success: false, data: err }));
  }

  // if alimini
  else {
    user = { ...user, alumini_details: req.body.alumini_details };
    User.create(user)
      .then((resp) => {
        // student
        student = { ...student, parent_id: resp.id };
        Student.create(student)
          .then(() => {
            // parent
            parent = { ...parent, parent_id: resp.id };
            Parent.create(parent)
              .then(() => {
                // address
                address = { ...address, parent_id: resp.id };
                Address.create(address)
                  .then((resp) =>
                    res
                      .status(200)
                      .send({ success: true, message: "Successfully Created" })
                  )
                  .catch((err) =>
                    res.status(400).send({ success: false, data: err })
                  );
              })
              .catch((err) =>
                res.status(400).send({ success: false, data: err })
              );
          })
          .catch((err) => res.status(400).send({ success: false, data: err }));
      })
      .catch((err) => res.status(400).send({ success: false, data: err }));
  }
};

//get user all
exports.getUser = async (req, res) => {
  await User.findAll({ include: [Student, Parent, Address] })
    .then((resp) => {
      for (let i = 0; i < resp.length; i++) {
        let alumini_details = dataParser.dataParser(resp[i].alumini_details);
        resp[i].alumini_details = alumini_details;
      }
      res.status(200).send({
        success: true,
        message: null,
        data: resp.reverse(),
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

//get user by Id
exports.getUserById = async (req, res) => {
  let userId = req.params.id;
  await User.findAll({
    where: { id: userId },
    include: [Student, Parent, Address],
  })
    .then((resp) => {
      console.log("user", resp);

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

//get user by Id
exports.updateapplicationStatus = async (req, res) => {
  console.log("qwdqwdw", req.body);
  User.findAll({ where: { id: 4 } })
    .then(function (user) {
      User.update(
        {
          status: req.body.status,
        },
        {
          where: { id: req.body.id },
        }
      )
        .then((resp) => {
          res.send({ success: true, message: "SuccessFully Updated" });
        })
        .catch((err) => {
          res.send({ success: true, message: "Error Occured While Creating!" });
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
