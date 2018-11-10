const Vote = artifacts.require("Vote");
const MyVerify = artifacts.require("MyVerify");
//const Owned = artifacts.require("Owned");

module.exports = (deployer,accounts) =>{
    deployer.deploy(Vote);
    deployer.deploy(MyVerify);
    //deployer.deploy(Owned);
    //gas: 2000000
};

// module.exports = function(deployer,accounts) {   
//     deployer.deploy(Owned).then(()=> deployer.deploy(MyVerify)).then(() => deployer.deploy(Vote));
// }
