export const responseObj = (statusCode, status, message = '') => {
    return {
        statusCode,
        status,
        message
    }
};

export const responseNotification = (title, body, icon) => {
    return {
        title,
        body,
        icon
    }
};