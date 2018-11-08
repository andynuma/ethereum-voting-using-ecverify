const Vote = artifacts.require("../contracts/Vote.sol")
const MyVerifiy = artifacts.require("../contracts/MyVerify.sol")


contract("Vote",(accounts) => {    

    beforeEach(async () => {
        contractInstance = await Vote.deployed()
        organizer = await accounts[0]
        voter = await accounts[1]
        inspector = await accounts[2]
    })

    it("count gas cost", async() =>{

        console.log(accounts[0])
        console.log(organizer)

        const voteId = await 0

        // console.log("test1")

        // create vote
        const hash = await web3.sha3("0x11")
        await contractInstance.setVoterAddr(organizer,{from:organizer});
        const tx1 = await contractInstance.createVote(hash,{from:organizer});
        assert.isOk(tx1)

        // console.log("test2")

        //sign by organizer
        const organizer_sig = await web3.eth.sign(organizer,hash)
        const tx2 = await contractInstance.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx2)

        // console.log(organizer_sig)
        // console.log("test3")


        // // sign by inspector
        const tx3 = await contractInstance.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(tx3)
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const tx4 = await contractInstance.signByInspector(0,inspector_sig,{from:inspector}) 
        assert.isOk(tx4)

        // console.log(voter)

        // // voter gas estimate
        const voter_balance = web3.eth.getBalance(voter).toNumber();
        const voter_balance_eth = web3.fromWei(voter_balance,'ether')
        const voter_result = 100.0 - voter_balance_eth;
        console.log("voter: ",voter_result)

        // organizer gas estimate
        const organizer_balance = await web3.eth.getBalance(organizer).toNumber();
        const organizer_balance_eth = await web3.fromWei(organizer_balance,'ether')
        const organizer_result = await 100.0 - organizer_balance_eth;
        console.log("organizer: ",organizer_result)

        // // inspector gas estimate
        const inspector_balance = web3.eth.getBalance(inspector).toNumber();
        const inspector_balance_eth = web3.fromWei(inspector_balance,'ether')
        const inspector_result = 100.0 - inspector_balance_eth;
        console.log("inspector: ",inspector_result)
    })

})