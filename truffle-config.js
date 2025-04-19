module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      "gas-limit": 6721975,
    },
    develop: {
      port: 8545
    }
  },
  compilers: {
    solc: {
      version: "0.5.0", // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
