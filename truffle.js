var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "waste follow find kidney luxury author flush stove party fade food rule";

module.exports = {
  networks: {

        development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "*" // Match any network id
        //gas:290000,
        //solc: { optimizer: { enabled: true, runs: 200 } }
        //gas:4712388
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          mnemonic,
          "https://ropsten.infura.io/v3/880d7c83a78c4727843049b144b9f760",
         0,3
        );
      },
      network_id: 3,
      gas: 5000000
    }   
  }
}
