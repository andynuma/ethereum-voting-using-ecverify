const Vote = artifacts.require("../contracts/Vote.sol")
const MyVerifiy = artifacts.require("../contracts/MyVerify.sol")

contract("Vote",async(accounts) => {    

    it("set voter address from Owner address", async() =>{
        //account_one is Owner address
        let account_one = accounts[0]
        let account_two = accounts[1]
        //console.log(account_two)
        const vote = await Vote.deployed()
        const tx = await vote.setVoterAddr(account_two,{from:account_one});
        // console.log(vote.setVoterAddr.estimateGas(account_two,{from:account_one}))
        console.log("set voter address:", web3.eth.estimateGas(tx),"wei")
        assert.isOk(tx)
    })

    it("set voter address from incorrect address", async() =>{
        const vote = await Vote.deployed()
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


    it("create ballot from correct voter" , async() =>{
        const vote = await Vote.deployed()
        //account_one is Owner address
        let account_one = accounts[0]
        let account_two = accounts[1]

        const hash = await web3.sha3("0x11")

        await vote.setVoterAddr(account_two,{from:account_one});
        const tx = await vote.createVote(hash,{from:account_two});
        console.log("create ballot:", web3.eth.estimateGas(tx),"wei")

        assert.isOk(tx)
 
    })

    it("create ballot from INCORECCT VOTER" , async() =>{
        const vote = await Vote.deployed()
        //account_one is Owner address
        let account_one = accounts[0]
        let account_two = accounts[1]
        let account_three = accounts[2]

        let err = null

        const hash = await web3.sha3("0x11")


        await vote.setVoterAddr(account_two,{from:account_one});
        
        try{
            await vote.createVote(hash,{from:account_three});
        }catch(error){
            err = error
        }
        assert.ok(err instanceof Error)
    })

    it("check sign by Organizer" , async() =>{

        const account_one = accounts[0]

        //ballotの作成
        const vote = await Vote.deployed()
        const testVote = await vote.votes.call(0)

        //署名作成(sign)
        const hash = web3.sha3("0x11")
        const sig = web3.eth.sign(account_one,hash)

        const tx = await vote.signByOrganizer(0,sig)
        console.log("sign by organizer:", web3.eth.estimateGas(tx),"wei")
        assert.isOk(tx)
 
    })

    it("set address for inspector" , async() =>{
        
        const vote = await Vote.deployed()

        const account_one = accounts[0]
        const account_two = accounts[1]
        
        const tx = vote.setInspectorAddr(account_two)
        console.log("set address of inspector:", web3.eth.estimateGas(tx),"wei")

        assert.isOk(tx)

    })
    

    it("check sign by Inspector" , async() =>{

        const vote = await Vote.deployed()
        const verifyInstance = await MyVerifiy.deployed()
        const VoteInstance = await vote.votes(0)

        //アドレス設定
        //const organizer = await vote.address // organizer address is contract address
        const organizer = await accounts[0]
        // console.log("organizerAddr:",organizer)
        const voter = await accounts[1]
        const inspector = await accounts[2]

        //set address for voter
        await vote.setVoterAddr(voter,{from:organizer});
        
        const hash = await web3.sha3("0x11")
        // console.log("hash:",hash)

        //make vote
        const tx = await vote.createVote(hash,{from:voter});
        assert.isOk(tx)

        const organizer_sig = await web3.eth.sign(organizer,hash)
        // console.log("Organizer's sig:",organizer_sig)

        const voteId = await 0

        const tt = await vote.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tt)

        const return_address = await verifyInstance.ecverify(hash,organizer_sig)
        assert.equal(return_address, organizer,"should match two accounts")


        //監査者のアドレスを設定
        const t = await vote.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(t)

        //監査者の署名
        const inspector_sig = await web3.eth.sign(inspector,hash)
        const return_address_inspector = await verifyInstance.ecverify(hash,inspector_sig)
        assert.equal(return_address_inspector, inspector,"should match two accounts")

        const return_organizerAddr = await verifyInstance.ecverify(VoteInstance[0],VoteInstance[2])
        assert.equal(return_organizerAddr, organizer,"should match two accounts")

        const txt = await vote.signByInspector(0,inspector_sig,{from:inspector}) 


        console.log("sign by inspector:", web3.eth.estimateGas(txt),"wei")

        
        assert.isOk(txt)

        //const testInstance = await vote.votes(0)
    })

    
});