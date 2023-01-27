

const errorHandlerMiddleware = (error, req, res, next) => {
 
    const defaultError = {
        statusCode: error.statusCode || 500,
        msg: error.message ||'Something went wrong , try again later'
    }

    if (error.name == 'ValidationError') {
        defaultError.statusCode = 400,
        defaultError.msg=Object.values(error.errors).map((item)=> item.message).join(',')
    }
    if(error.code && error.code===11000){
        defaultError.statusCode = 400,
        defaultError.msg = `${Object.keys(error.keyValue).join(',')} field has to be unique`
    }
    res.status(defaultError.statusCode).json({
        message: defaultError.msg
        // message: error
    })
}

export default errorHandlerMiddleware