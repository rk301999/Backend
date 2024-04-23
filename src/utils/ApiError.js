class ApiError extends Error{ //extending the nodejs error class
    constructor(statusCode,message="Something went wrong",errors = [],stack = ""){ // overriding the custructor with our personal properties
        super(message)
        this.statusCode = statusCode 
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors
        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this,this.constructor)
        }
    }

}
export {ApiError};