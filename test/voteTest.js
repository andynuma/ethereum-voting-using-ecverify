const Vote = artifacts.require("../contracts/Vote.sol")
const MyVerifiy = artifacts.require("../contracts/MyVerify.sol")

contract("Vote",(accounts) => {    

    beforeEach(async () => {
        contractInstance = await Vote.deployed()
        organizer = await accounts[0]
        voter = await accounts[1]
        inspector = await accounts[2]
    })

    it("voter can send vote to organizer",async() => {

        const voteId = await 0
        // create vote
        const hash = await web3.sha3("0x11")
        await contractInstance.setVoterAddr(voter,{from:organizer});
        const tx1 = await contractInstance.createVote(hash,{from:voter});
        assert.isOk(tx1)

        // sign by organizer
        const organizer_sig = await web3.eth.sign(organizer,hash)
        const tx2 = await contractInstance.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx2)

        // sign by inspector
        const tx3 = await contractInstance.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(tx3)
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const tx4 = await contractInstance.signByInspector(0,inspector_sig,{from:inspector}) 
        assert.isOk(tx4)

        // send vote to organizer
        const mypkv = "0x11"
        const tx5 = contractInstance.sendToOrganizer(mypkv,0,{from:voter})
        console.log("send vote to organizer:", web3.eth.estimateGas(tx5),"wei")
        assert.isOk(tx5)
       
    })

    it("only voter can vote",async() => {
        const voteId = await 0

        // create vote
        const hash = await web3.sha3("0x11")
        await contractInstance.setVoterAddr(voter,{from:organizer});
        const tx1 = await contractInstance.createVote(hash,{from:voter});
        assert.isOk(tx1)

        // sign by organizer
        const organizer_sig = await web3.eth.sign(organizer,hash)
        const tx2 = await contractInstance.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx2)

        // sign by inspector
        const tx3 = await contractInstance.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(tx3)
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const tx4 = await contractInstance.signByInspector(0,inspector_sig,{from:inspector}) 
        assert.isOk(tx4)

        const mypkv = "0x11"  
        const otherAccount = accounts[4] 
        
        try{
            await contractInstance.sendToOrganizer(mypkv,0,{from:otherAccount})
            assert.ok(false,"The contract should reject this case")
        }catch(error){
            assert.ok(true,"The contract is not allowing external users to send vote ")
        }        
    })

    it("organizer can set result",async() => {
        const voteId = await 0

        // create vote
        const hash = await web3.sha3("0x11")
        await contractInstance.setVoterAddr(voter,{from:organizer});
        const tx1 = await contractInstance.createVote(hash,{from:voter});
        assert.isOk(tx1)

        // sign by organizer
        const organizer_sig = await web3.eth.sign(organizer,hash)
        const tx2 = await contractInstance.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx2)

        // sign by inspector
        const tx3 = await contractInstance.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(tx3)
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const tx4 = await contractInstance.signByInspector(0,inspector_sig,{from:inspector}) 
        assert.isOk(tx4)

        const candidateId = 1;

        const tx5 = await contractInstance.voteToCandidate(voter,candidateId,{from:organizer})
        console.log("set result:", web3.eth.estimateGas(tx5),"wei")

        assert.isOk(tx5)

    })

    it("only organizer set result of voting",async() => {
        const voteId = await 0

        // create vote
        const hash = await web3.sha3("0x11")
        await contractInstance.setVoterAddr(voter,{from:organizer});
        const tx1 = await contractInstance.createVote(hash,{from:voter});
        console.log("aa",hash)
        assert.isOk(tx1)

        // sign by organizer
        const organizer_sig = await web3.eth.sign(organizer,hash)
        const tx2 = await contractInstance.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx2)

        // sign by inspector
        const tx3 = await contractInstance.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(tx3)
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const tx4 = await contractInstance.signByInspector(0,inspector_sig,{from:inspector}) 
        assert.isOk(tx4)

        try{
            await contractInstance.voteToCandidate(mypkv,0,{from:voter})
            assert.ok(false,"The contract should reject this case")
        }catch(error){
            assert.ok(true,"The contract is not allowing external users to send vote ")
        }     
    })

    it("can count vote",async() => {
        const voteId = await 0

        // create vote
        const hash = await web3.sha3("0x11")
        await contractInstance.setVoterAddr(voter,{from:organizer});
        const tx1 = await contractInstance.createVote(hash,{from:voter});
        assert.isOk(tx1)

        // sign by organizer
        const organizer_sig = await web3.eth.sign(organizer,hash)
        const tx2 = await contractInstance.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx2)

        // sign by inspector
        const tx3 = await contractInstance.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(tx3)
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const tx4 = await contractInstance.signByInspector(0,inspector_sig,{from:inspector}) 
        assert.isOk(tx4)

        //vote
        const candidateId = await 3;
        const tx5 = await contractInstance.voteToCandidate(voter,candidateId,{from:organizer})
        assert.isOk(tx5)

        //view result
        const tx6 = await contractInstance.viewResult(voter)
        const result = tx6.toNumber()
        //console.log(result)
        //console.log("view result:", web3.eth.estimateGas(tx6),"wei")

        assert.equal(result,3,"should match two value .")
    })

    it("anyone can count vote",async() => {

        const voteId = await 0

        // create vote
        const hash = await web3.sha3("0x11")
        await contractInstance.setVoterAddr(voter,{from:organizer});
        const tx1 = await contractInstance.createVote(hash,{from:voter});
        assert.isOk(tx1)

        // sign by organizer
        const organizer_sig = await web3.eth.sign(organizer,hash)
        const tx2 = await contractInstance.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx2)

        // sign by inspector
        const tx3 = await contractInstance.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(tx3)
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const tx4 = await contractInstance.signByInspector(0,inspector_sig,{from:inspector}) 
        assert.isOk(tx4)

        //vote
        const candidateId = await 1; 
        const tx5 = await contractInstance.voteToCandidate(voter,candidateId,{from:organizer})
        assert.isOk(tx5)

        //view result
        const temp = await contractInstance.viewResult(voter,{from:accounts[4]}) // from : voter
        const result = await temp.toNumber()

        assert.equal(result,1,"should match two value .")
        
    })

    it("create hashs and  signature",async() => {

        // const organizer = "0x992cF0c689CAd8FC1FfF0698A71f6Fa7b444CFDe"
        // const voter = "0xa35cF7092Aa654785046102Ef34227B8abD79A47"
        // const inspector = "0x6E9b5E8E935ca6B51BFe03e1e1FEf1DFC63a4007"

        const organizer = await accounts[0]
        const voter = await accounts[1]
        const inspector = await accounts[2]

        console.log(organizer)
        console.log(voter)
        console.log(inspector)

        const hash = await web3.sha3("0x11")

        // sign by organizer
        // const organizer_sig = await web3.eth.sign(organizer,hash)
        // const inspector_sig = await web3.eth.sign(inspector,hash)

        // console.log(organizer_sig)
        // console.log(inspector_sig)

        web3.eth.sign(organizer,hash, function(error, result){
            if(!error)
                console.log(JSON.stringify(result));
            else
                console.error(error);
         })

         web3.eth.sign(voter,hash, function(error, result){
            if(!error)
                console.log(JSON.stringify(result));
            else
                console.error(error);
         })

         web3.eth.sign(inspector,hash, function(error, result){
            if(!error)
                console.log(JSON.stringify(result));
            else
                console.error(error);
         })
    })

})