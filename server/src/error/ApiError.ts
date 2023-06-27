class ApiError extends Error{
    status: any
    errors: any

    constructor(status, message, errors = []) {
        super();
        this.status = status
        this.message = message
        this.errors = errors
    }

    static badRequest(message, errors?) {
        return new ApiError(400, message, errors)
    }

    static internal(message) {
        return new ApiError(500, message)
    }

    static forbidden(message) {
        return new ApiError(403, message)
    }
}

export default ApiError