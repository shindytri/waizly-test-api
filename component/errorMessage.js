const errorMessageNotFound = (id = undefined) => {
    var message = ''

    if (id === undefined) {
        message = 'The requested URL was not found on the server.'
    } else {
        message = "Can not find data with _id: " + id
    }

    var errorMessage = {
        code: 404,
        message: message
    }

    return errorMessage
} 

const errorMessageBadCastId = (id) => {
    
    var message = "Cast to ObjectId failed for value: " + id

    var errorMessage = {
        code: 400,
        message: message
    }

    return errorMessage
}

const errorMessage = (code) => {
    var message = ''
    switch(code) {
        case 500:
            message = 'Internal Server Error.'
            break;
        case 400:
            message = 'Bad Request.'
            break;
    }
    var errorMessage = {
        code: code,
        message: message
    }
    return errorMessage
}

const errorMessageUnprocessable = (value) => {
    
    var errorMessage = {
        code: 422,
        message: value
    }

    return errorMessage
}

module.exports = {
    errorMessageNotFound : errorMessageNotFound,
    errorMessageBadCastId : errorMessageBadCastId,
    errorMessage : errorMessage,
    errorMessageUnprocessable:errorMessageUnprocessable
}