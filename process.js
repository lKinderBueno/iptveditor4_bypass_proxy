exports.processManager = async (app) => {
    process.on('SIGINT', onSigint = async () => {
        console.log("CLOSING...")
        shutdown(app);
    });

    // quit properly on docker stop
    process.on('SIGTERM', onSigterm = async () => {
        console.log("CLOSING...")
        shutdown(app);
    })

    process.on('unhandledRejection', (err) => {
        console.log(err)
    })

    process.on('uncaughtException', err => {
        console.log(err, 'Uncaught Exception thrown');
        // process.exit(1);
    });
}

// shut down server
function shutdown(app) {
    // NOTE: server.close is for express based apps
    // If using hapi, use `server.stop`
    process.exit()
}