module.exports = responseSender = (res, data, status) => {
  res.status(status).send(data);
};
