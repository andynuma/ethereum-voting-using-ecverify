var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "until future purse mobile erosion double dumb obtain caught slice say damage";

module.exports = {
    networks: {
      ropsten: {
        provider: function() {
          return new HDWalletProvider(
            mnemonic,
            "https://ropsten.infura.io/v3/b911df35ce14433bb428a5fce838cbf6"
          );
        },
        network_id: 3,
        gas: 5000000
        
      }   
    }
  };
// module.exports = {
//     networks: {
//         development: {
//         host: "127.0.0.1",
//         port: 7545,
//         network_id: "*" // Match any network id
//         //gas:290000,
//         //solc: { optimizer: { enabled: true, runs: 200 } }
//         //gas:4712388
//     }
//   }
// };
