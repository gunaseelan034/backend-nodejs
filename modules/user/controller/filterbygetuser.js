exports.getUserbyFilter = async (
  parsedQuery,
  res,
  User,
  Student,
  Parent,
  Address
) => {
  if (
    typeof parsedQuery.relevant_type !== "undefined" &&
    typeof parsedQuery.mobile === "undefined" &&
    typeof parsedQuery.class === "undefined"
  ) {
    console.log("relevant_type");
    await User.findAll({
      include: [Student, Parent, Address],
      where: { relevant_type: parsedQuery.relevant_type },
    })
      .then((resp) =>
        res.status(200).send({
          success: true,
          message: null,
          data: resp.reverse(),
        })
      )
      .catch((err) => {
        res.status(400).send({
          success: true,
          message: null,
          data: err,
        });
      });
  }

  // only class ( SINGLE PARAMS )
  else if (
    typeof parsedQuery.class !== "undefined" &&
    typeof parsedQuery.relevant_type === "undefined" &&
    typeof parsedQuery.mobile === "undefined"
  ) {
    console.log("class");
    await User.findAll({
      include: [Student, Parent, Address],
    })
      .then((resp) => {
        let tmpVal = resp.filter((el) => {
          return el.students[0].class == parsedQuery.class;
        });
        res.status(200).send({
          success: true,
          message: null,
          data: tmpVal.reverse(),
        });
      })
      .catch((err) => {
        res.status(200).send({
          success: false,
          message: null,
          data: err,
        });
      });
  }

  // only mobile ( SINGLE PARAMS )
  else if (
    typeof parsedQuery.mobile !== "undefined" &&
    typeof parsedQuery.relevant_type === "undefined" &&
    typeof parsedQuery.class === "undefined"
  ) {
    console.log("mobile");
    await User.findAll({
      include: [Student, Parent, Address],
      where: { mobile: parsedQuery.mobile },
    })
      .then((resp) =>
        res.status(200).send({
          success: true,
          message: null,
          data: resp.reverse(),
        })
      )
      .catch((err) => {
        res.status(400).send({
          success: true,
          message: null,
          data: err,
        });
      });
  }

  // both relevant type and mobile ( DOUBLE PARAMS )
  else if (
    typeof parsedQuery.relevant_type !== "undefined" &&
    typeof parsedQuery.mobile !== "undefined" &&
    typeof parsedQuery.class === "undefined"
  ) {
    console.log("relevent and mobile");
    await User.findAll({
      include: [Student, Parent, Address],
      where: { relevant_type: parsedQuery.relevant_type },
    })
      .then((resp) => {
        let tmpVal = resp.filter((el) => {
          return el.mobile == parsedQuery.mobile;
        });
        res.status(200).send({
          success: true,
          message: null,
          data: tmpVal.reverse(),
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

  // both relevant type and class ( DOUBLE PARAMS )
  else if (
    typeof parsedQuery.relevant_type !== "undefined" &&
    typeof parsedQuery.class !== "undefined" &&
    typeof parsedQuery.mobile == "undefined"
  ) {
    console.log("relevent and class");
    await User.findAll({
      include: [Student, Parent, Address],
      where: { relevant_type: parsedQuery.relevant_type },
    })
      .then((resp) => {
        let tmpVal = resp.filter((el) => {
          return el.students[0].class == parsedQuery.class;
        });
        res.status(200).send({
          success: true,
          message: null,
          data: tmpVal.reverse(),
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

  // both mobile and class ( DOUBLE PARAMS )
  else if (
    typeof parsedQuery.mobile !== "undefined" &&
    typeof parsedQuery.class !== "undefined" &&
    typeof parsedQuery.relevant_type === "undefined"
  ) {
    console.log("mobile and class");
    await User.findAll({
      include: [Student, Parent, Address],
      where: { mobile: parsedQuery.mobile },
    })
      .then((resp) => {
        let tmpVal = resp.filter((el) => {
          return el.students[0].class == parsedQuery.class;
        });
        res.status(200).send({
          success: true,
          message: null,
          data: tmpVal.reverse(),
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

  // both ALL Three ( DOUBLE PARAMS )
  else {
    console.log("all three params");
    await User.findAll({
      include: [Student, Parent, Address],
      where: { mobile: parsedQuery.mobile },
    })
      .then((resp) => {
        // nested filters
        let classFilter = resp.filter((el) => {
          return el.students[0].class == parsedQuery.class;
        });

        let relTypeFilter = classFilter.filter((el) => {
          return el.relevant_type == parsedQuery.relevant_type;
        });

        res.status(200).send({
          success: true,
          message: null,
          data: relTypeFilter.reverse(),
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
