const successResponse = (res, data = null,message=null,code=200) => {
    return res.status(code).json({ status: true, data,message });
  };
  
  const errorResponse = (res, errorMessage = 'Internal Server Error',code=500) => {
    return res.status(code).json({ status: false, error: errorMessage });
  };
  
  module.exports = { successResponse, errorResponse };
  