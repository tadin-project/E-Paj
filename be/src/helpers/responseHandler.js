const responseHandler = ({ status = true, msg = "", payload = null }) => {
  let response = {
    status,
  };

  if (payload) {
    response.payload = payload;
  }

  if (msg) {
    response.msg = msg;
  }

  return response;
};

module.exports = responseHandler;
