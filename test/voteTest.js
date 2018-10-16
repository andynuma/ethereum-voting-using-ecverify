
const Vote = artifacts.require("../contracts/Vote.sol")
const MyVerifiy = artifacts.require("../contracts/MyVerify.sol")

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


    it("create ballot from correct voter" , async() =>{
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

    it("check sign by Organizer" , async() =>{

        const account_one = accounts[0]

        //まずballotの作成
        const vote = await Vote.deployed()
        const testVote = await vote.votes.call(0)
        //const [hashedVote,voterAddr,signByOrganizer] = testVote

        //署名作成(sign)
        const hash = web3.sha3("0x1111")
        const sig = web3.eth.sign(account_one,hash)

        const tx = await vote.signByOrganizer(0,sig)

        assert.isOk(tx)
 
    })

    it("set address for inspector" , async() =>{
        
        const vote = await Vote.deployed()

        const account_one = accounts[0]
        const account_two = accounts[1]
        
        const tx = vote.setInspectorAddr(account_two)
        assert.isOk(tx)

    })
    

    it("check sign by Inspector" , async() =>{

        const vote = await Vote.deployed()
        const verifyInstance = await MyVerifiy.deployed()

        //アドレス設定
        const organizer = await accounts[0]
        const voter = await accounts[1]
        const inspector = await accounts[2]

        console.log("organizerAddr:",organizer)
        //const temp = '0xe72e94122cb83dfc625371b5e9bbf2acfb13235f';
        // console.log(voter)
        // console.log(inspector)


        //票の作成
        await vote.setVoterAddr(voter,{from:organizer});
        
        // make Vote
        //hashVote = web3.sha3("0x110000...")
        const hash = await web3.sha3("0x1100000000000000000000000000000000000000000000000000000000000000")
        const tx = await vote.createVote(hash,{from:voter});
        assert.isOk(tx)

         //organizerの署名の作成
        //const hash = await web3.sha3("0x1100000000000000000000000000000000000000000000000000000000000000")
        const sig = await web3.eth.sign(organizer,hash)
        console.log("organizer's sig:",sig)

        const return_address = await verifyInstance.ecverify(hash,sig)
        console.log("return_address:", return_address)
        assert.equal(return_address, organizer,"should match two accounts")

        //監査者のアドレスを設定
        const t = await vote.setInspectorAddr(inspector,{from:organizer})
        //assert.isOk(t)

        const voterId = 0

        //organizerの署名を作成
        //testVoteにhasedVoteとsignByorganizerを入れたいんだけど，入ってない？
        const VoteInstance = await vote.votes(0)
        //const organizerSignature = VoteInstance[2]
        //TODO: voterIdで呼び出すVote Structはコントラクト内ではhashVoteとして"0x11"を入れている，でも実際はweb3.sha3
        //で値を変更しているので，hashを初期値として与えた
        //const vote.votes
        //console.log(VoteInstance[2])
        //console.log(organizerSignature)
        const tt = await vote.signByOrganizer(voterId,sig,{from:organizer})
        console.log(VoteInstance)

        assert.isOk(tt)

        //ほんとはcreateVoteすれば自動で値が入るはずなんですけど
        // testVote.hashedVote = "0x1100000000000000000000000000000000000000000000000000000000000000"
        // testVote.signByOrganizer =  sig
        //console.dir(testVote)
        //console.log("testVote.signByOrganizer :  " , testVote.signByOrganizer)

        //監査者の署名
        const inspector_sig = await web3.eth.sign(inspector,hash)
        console.log("inspector's signature:",inspector_sig)
        const return_address_inspector = await verifyInstance.ecverify(hash,inspector_sig)
        assert.equal(return_address_inspector, inspector,"should match two accounts")
        
        console.log("0:",VoteInstance[0])
        console.log("2:",VoteInstance[2])

        const return_organizerAddr = verifyInstance.ecverify(VoteInstance[0],VoteInstance[2])
        console.log(return_organizerAddr)

        //TODO:requireでエラー(organizerの署名が機能していない)
        //const txt = await vote.signByInspector(0,inspector_sig,{from:inspector}) 
        //console.log(txt)
        //assert.isOk(txt)
 
    })

    // it("can get user", async () => {
    //     const vote = await Vote.deployed()
    //     const voterId = 1
        
    //     // Get the voterInfo array
    //     const userInfo = await vote.getVoteFromId.call(voterId)
        
    //     // Get the first element (the hashedvote)
    //     const hashedvote = userInfo[0]
    
    //     assert.equal(hashedvote, "0x11")
    //   });
    
    
});