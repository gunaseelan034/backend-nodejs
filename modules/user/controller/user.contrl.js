const { sendMail } = require("../../../config/nodemailer");
const dataParser = require("../../../dataparser/index");
const db = require("../../../lib/connection");
const { getUserbyFilter } = require("./filterbygetuser");
const User = db.user;
const Student = db.student;
const Parent = db.parentdetails;
const Address = db.address;

exports.verifyEmail = async (req, res) => {
  console.log("hitted");
};

exports.createUser = async (req, res) => {
  const tmpArr = [];
  const totalData = await User.findAll();
  tmpArr.push(totalData);
  const increamentValue = tmpArr[0].length + 1;

  let user = {
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
    if (typeof req.body.alumini_details === "undefined") {
      console.log("1 alumini details required");
      res.status(400).send({ data: [], message: "Alumini details required" });
    } else {
      console.log("2", JSON.parse(req.body.alumini_details));
      user = {
        ...user,
        alumini_details: JSON.parse(req.body.alumini_details),
      };
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
                      res.status(200).send({
                        success: true,
                        message: "Successfully Created",
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
            .catch((err) =>
              res.status(400).send({ success: false, data: err })
            );
        })
        .catch((err) => res.status(400).send({ success: false, data: err }));
    }
  }
};

//get user all
exports.getUser = async (req, res) => {
  const parsedQuery = JSON.parse(req.params.filters);
  const isEmpty = Object.keys(parsedQuery).length === 0;
  console.log(isEmpty);

  if (!isEmpty) {
    console.log(parsedQuery, "BEFORE");

    parsedQuery.mobile === "" ? delete parsedQuery.mobile : parsedQuery.mobile;
    console.log(parsedQuery, "AFTER");
    getUserbyFilter(parsedQuery, res, User, Student, Parent, Address);
  } else {
    await User.findAll({
      include: [Student, Parent, Address],
    })
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
exports.getSuggestionStudent = async (req, res) => {
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

//get interview list
exports.getInterViewList = async (req, res) => {
  console.log("hitted");
  User.findAll({
    where: { status: "Interview" },
    include: [Student, Parent, Address],
  })
    .then((resp) => {
      res.send({ success: true, message: null, data: resp.reverse() });
    })
    .catch((err) => {
      res.send({ success: false, message: null, data: [] });
    });
};

//update user by Id
exports.updateapplicationStatus = async (req, res) => {
  console.log(req.body);
  User.update(
    {
      status: req.body.status,
    },
    {
      where: { id: req.body.id },
    }
  )
    .then((resp) => {
      User.findAll({
        where: { id: req.body.id },
      })
        .then((userResp) => {
          console.log(userResp);

          sendMail(userResp[0].status, req.body.studentData, res);
          res.send({ success: true, message: "SuccessFully Updated" });
        })
        .catch((err) => res.send({ data: err }));
    })
    .catch((err) => {
      res.send({ success: true, message: "Error Occured While Creating!" });
    });
};

exports.sheduleInterview = async (req, res) => {
  console.log(req.body);
  User.update(
    {
      status: req.body.status,
    },
    {
      where: { id: req.body.id },
    }
  )
    .then(() => {
      User.update(
        {
          interview_date: req.body.interview_date,
        },
        {
          where: { id: req.body.id },
        }
      );
    })
    .then(() => {
      User.update(
        {
          interview_time: req.body.interview_time,
        },
        {
          where: { id: req.body.id },
        }
      );
    })
    .then((resp) => {
      User.findAll({
        where: { id: req.body.id },
      })
        .then((userResp) => {
          sendMail(userResp[0], req.body.studentData, res);
          res.send({ success: true, message: "SuccessFully Updated" });
        })
        .catch((err) => res.send({ data: err }));
    })
    .catch((err) => {
      res.send({ success: true, message: "Error Occured While Creating!" });
    });
};
