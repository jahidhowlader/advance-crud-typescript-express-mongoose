class AppError extends Error {

    public status: number
    constructor(status: number, message: string, stack: string = "") {

        super(message)
        this.status = status

        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export default AppError