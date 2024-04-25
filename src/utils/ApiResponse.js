class ApiResponse {
    constructor (statusCode ,data , message = "Success"){
        this.statusCode = statusCode,
        this.data = data,
        this.message = message,
        this.success = statusCode < 400 //All success codes are within 400
    }
}

export {ApiResponse}