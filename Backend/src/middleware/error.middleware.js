const errorHandler = (err, req, res, next) => {

    if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
            success: false,
            message: "Resume file size must be less than 5 MB."
        });
    }

    if (err.message === "Only PDF resume files are allowed.") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    return res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
};

module.exports = errorHandler;