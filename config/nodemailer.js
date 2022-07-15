const nodemailer = require("nodemailer");

exports.sendMail = (status, userEmail, res) => {
  const assignStatus = () => {
    if (status === "approve")
      return 'Admission Id: '+ userEmail.admission_no + " Your Application Approved!";
    if (status === "shortlist")
      return (
        'Admission Id: '+userEmail.admission_no +
        " Your Application is Shortlisted for Next Filtration"
      );
    if (status === "reject")
      return 'Admission Id: '+ userEmail.admission_no + " Your Application is Rejected";
    if (status === "waiting")
      return 'Admission Id: '+ userEmail.admission_no + " Your application is Keep Waiting List";
  };

  const body_template = assignStatus();
  smtpProtocol = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "gunaseelank04@gmail.com",
      pass: "fttt mtmc emlm ynap",  // smtp google auth pass
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
      res.status(400).send({success: false, data: err})
    }
    console.log("Message Sent");
    smtpProtocol.close();
  });
};
