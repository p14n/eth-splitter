module.exports = {
    networks: {
        development: {
            host: "localhost",
            port: 8545,
            network_id: "*" // Match any network id
        },
        geth: {
            host: "localhost",
            port: 8545,
            network_id: "*",
            gas: 4712380
        }
    }

};

