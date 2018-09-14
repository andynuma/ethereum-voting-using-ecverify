const web3 = require('web3')
const utils = require("./utils")
const {assertVMException} = utils

// Get the hexToString function from web3:
const {
  utils: { hexToString },
} = web3

const Vote = artifacts.require("../contracts/Vote.sol")


contract("Vote",async(accounts) => {    
    
    it("deploy test" ,async() =>{
        const vote = await Vote.deployed()
        vote.test(1);
        const id = await vote.testreturn.call()
        //console.log(id.toNumber())
        assert.equal(id.toNumber(),1)
    })

    it("set voter address from Owner address", async() =>{

        //account_one is Owner address
        let account_one = accounts[0]
        let account_two = accounts[1]
        //console.log(account_two)
        const vote = await Vote.deployed()
        const tx = await vote.setVoterAddr(account_two,{from:account_one});
        assert.isOk(tx)

    })

    it("set voter address from incorrect address", async() =>{
        const vote = await Vote.deployed()
        // vote.setVoterAddr(0x627306090abab3a6e1400e9345bc60c78a8bef57)
        // assert.isOK(setVoterAddr)
        //account_one is Owner address
        let account_one = accounts[0]

        let account_two = accounts[1]
        let account_three = accounts[2]

        let err = null

        try{
            await vote.setVoterAddr(account_three,{from:account_two});
        }catch(error){
            err = error
        }
        assert.ok(err instanceof Error)
    })


    it("create vote from correct voter" , async() =>{
        const vote = await Vote.deployed()
        //account_one is Owner address
        let account_one = accounts[0]
        let account_two = accounts[1]

        await vote.setVoterAddr(account_two,{from:account_one});
        const tx = await vote.createVote("0x011",{from:account_two});
        assert.isOk(tx)
 
    })

    it("create ballot from INCORECCT VOTER" , async() =>{
        const vote = await Vote.deployed()
        //account_one is Owner address
        let account_one = accounts[0]
        let account_two = accounts[1]
        let account_three = accounts[2]

        let err = null

        await vote.setVoterAddr(account_two,{from:account_one});
        
        try{
            await vote.createVote("0x011",{from:account_three});
        }catch(error){
            err = error
        }

        assert.ok(err instanceof Error)
    })
    
});