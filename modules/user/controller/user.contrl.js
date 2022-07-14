const dataParser = require("../../../dataparser/index");
const db = require("../../../lib/connection");
const User = db.user;
const Student = db.student;
const Parent = db.parentdetails;
const Address = db.address;

exports.createUser = async (req, res) => {
  const tmpArr = [];
  const totalData = await User.findAll();
  tmpArr.push(totalData);
  const increamentValue = tmpArr[0].length + 1;

  const user = {
    email: req.body.email,
    mobile: req.body.mobile,
    relevant_type: req.body.relevant_type,
    applicant_photo: req.files.applicant_photo[0].filename,
    adhar_photo: req.files.adhar_photo[0].filename,
    age_proof: req.files.age_proof[0].filename,
    father_photo: req.files.father_photo[0].filename,
    mother_photo: req.files.mother_photo[0].filename,
    admission_no: new Date().getFullYear() + "MVM" + 0 + increamentValue,
  };

  let student = JSON.parse(req.body.student_details);
  let parent = JSON.parse(req.body.parent_details);
  let address = JSON.parse(req.body.address);

  // generel type
  if (user.relevant_type === "General") {
    User.create(user)
      .then((resp_parent) => {
        // student
        student = { ...student, parent_id: resp_parent.id };
        Student.create(student)
          .then(() => {
            // parent
            parent = { ...parent, parent_id: resp_parent.id };
            Parent.create(parent)
              .then(() => {
                // address
                address = { ...address, parent_id: resp_parent.id };
                Address.create(address)
                  .then((resp) =>
                    res.status(200).send({
                      success: true,
                      message: "Successfully Created",
                      data: resp_parent,
                    })
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
  if (typeof req.params.filters !== "undefined") {
    const parsedQuery = JSON.parse(req.params.filters);
    const isEmpty = Object.keys(parsedQuery).length === 0;

    if (isEmpty) {
      await User.findAll({
        include: [Student, Parent, Address],
      })
        .then((resp) => {
          for (let i = 0; i < resp.length; i++) {
            let alumini_details = dataParser.dataParser(
              resp[i].alumini_details
            );
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
    } 
  } else {
      const relevantType = parsedQuery.relevant_type;
      const mobile = parsedQuery.mobile;

      if (typeof mobile === "undefined") {
        let user = await User.findAll({
          include: [Student, Parent, Address],
          where: { relevant_type: relevantType },
        });
        res.status(200).send({
          success: true,
          message: null,
          data: user.reverse(),
        });
      } else if (typeof relevantType === "undefined") {
        let user = await User.findAll({
          include: [Student, Parent, Address],
          where: { mobile: mobile },
        });
        res.status(200).send({
          success: true,
          message: null,
          data: user.reverse(),
        });
      }
  }
};

//get user by Id
exports.getUserById = async (req, res) => {
  let userId = req.params.id;
  await User.findAll({
    where: { id: userId },
    include: [Student, Parent, Address],
  })
    .then((resp) => {
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

//get suggestion
exports.getSuggestionStudent = (req, res) => {
  User.findAll({ include: [Student] })
    .then((resp) => {
      var newArray = resp.filter((el) => {
        return el.admission_no.includes(req.params.filter);
      });
      res.status(200).send({ data: newArray });
    })
    .catch((err) => {
      res.send({ success: false, data: err });
    });
};

//update user by Id
exports.updateapplicationStatus = async (req, res) => {
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
