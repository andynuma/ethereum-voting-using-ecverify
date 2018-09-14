const Vote = artifacts.require("Vote");
const MyVerify = artifacts.require("MyVerify");
const Owned = artifacts.require("Owned");

module.exports = (deployer) =>{
    deployer.deploy(Vote);
    deployer.deploy(MyVerify);
    deployer.deploy(Owned);

};

// module.exports = (deployer) => {
//     deployer.deploy(Owned)
//     .then(() => {

//     })
// }