const nodemailer = require("nodemailer");

exports.sendMail = (resp, userEmail, res) => {
  const assignStatus = () => {
    if (resp.status === "approve")
      return (
        "Admission Id: " +
        userEmail.admission_no +
        " Your Application Approved!"
      );
    if (resp.status === "shortlist")
      return (
        "Admission Id: " +
        userEmail.admission_no +
        " Your Application is Shortlisted for Next Filtration"
      );
    if (resp.status === "reject")
      return (
        "Admission Id: " +
        userEmail.admission_no +
        " Your Application is Rejected"
      );
    if (resp.status === "waiting")
      return (
        "Admission Id: " +
        userEmail.admission_no +
        " Your application is Keep Waiting List"
      );
    if (resp.status === "Interview")
      return (
        "Admission Id: " +
        userEmail.admission_no +
        "School Management is Scheduled the Interview On" +
        resp.interview_date
      );
  };

  const body_template = assignStatus();
  smtpProtocol = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gunaseelank04@gmail.com",
      pass: "fttt mtmc emlm ynap", // smtp google auth pass
    },
  });

  var mailoption = {
    from: "gunaseelank04@gmail.com",
    to: userEmail.email,
    subject: "Application Status Update",
    html: body_template,
  };

  smtpProtocol.sendMail(mailoption, function (err, response) {
    if (err) {
      console.log(err);
      res.status(400).send({ success: false, data: err });
    }
    console.log("Message Sent");
    smtpProtocol.close();
  });
};
