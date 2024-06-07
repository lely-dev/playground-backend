//BAD REQUEST 400
export const badRequest = (err, req, res, next) => {
    if (err.status === 400) {
      res.status(400).send({
        success: false,
        message: err.message,
        errorsList: err.errorsList?.map((e) => e.msg) || [],
      });
    } else {
      next(err);
    }
  };
  
  //NOT UNAUTHORIZED 401
  export const unathorizedError = (err, req, res, next) => {
    if (err.status === 401) {
      res.status(401).send({
        success: false,
        message: err.message,
      });
    } else {
      next(err);
    }
  };
  
  //404 NOT FOUND
  export const notFoundError = (err, req, res, next) => {
    if (err.status === 404) {
      res.status(404).send({
        success: false,
        message: err.message,
      });
    } else {
      next(err);
    }
  };
  
  //ERRORI GENERICI
  export const genericError = (err, req, res, next) => {
    console.log("ERROR: ", err);
  
    res.status(500).send({
      success: false,
      message:
        "Ci scusiamo! C'è stato un problema sui nostri server. Riprova più tardi!",
    });
  };