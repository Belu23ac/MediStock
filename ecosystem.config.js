module.exports = {
    apps: [
        {
            name: "MediStock-api-server",
            script: "./server/index.js",
            instances: "max",      // Or set to 1 if you want a single instance
            exec_mode: "cluster",  // Use clustering if desired
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};