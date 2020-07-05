const verifyOS = (req, res, next) => {
    if(process.platform === 'darwin') {
        return next(response.status(200).json({
            message: 'macOS'
        }));
    } else if(process.platform === 'win32') {
        return next(response.status(200).json({
            message: 'windows'
        }));
    } else if(process.platform === 'linux') {
        return next(response.status(200).json({
            message: 'linux'
        }));
    }
    return next(response.status(404).json({
        message: 'OS not supported for this action'
    }));
};