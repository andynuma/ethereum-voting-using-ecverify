
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

        const hash = await web3.sha3("0x11")

        await vote.setVoterAddr(account_two,{from:account_one});
        const tx = await vote.createVote(hash,{from:account_two});
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

        //まずballotの作成
        const vote = await Vote.deployed()
        const testVote = await vote.votes.call(0)
        //const [hashedVote,voterAddr,signByOrganizer] = testVote

        //署名作成(sign)
        const hash = web3.sha3("0x11")
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
        const VoteInstance = await vote.votes(0)


        //アドレス設定
        //const organizer = await vote.address // organizer address is contract address
        const organizer = await accounts[0]
        console.log("organizerAddr:",organizer)
        const voter = await accounts[1]
        const inspector = await accounts[2]

        console.log("organizerAddr:",organizer)
        console.log("voterAddr:",voter)

        // const test = await vote.organizerAddr;
        // console.log("test: ",test)

        //const temp = '0xe72e94122cb83dfc625371b5e9bbf2acfb13235f';
        // console.log(voter)
        // console.log(inspector)


        //set address for voter
        await vote.setVoterAddr(voter,{from:organizer});
        
        // make hash
        //const hash = await web3.sha3("0x1100000000000000000000000000000000000000000000000000000000000000")
        const hash = await web3.sha3("0x11")
        console.log("hash:",hash)


        //make vote
        const tx = await vote.createVote(hash,{from:voter});
        console.log("(after createVote) VoteInstance :\n",VoteInstance)
        assert.isOk(tx)
        // console.log("hash:",hash)
        //console.log("(after createVote)VoteStructInstance:",VoteInstance)
        //console.log("encoded hash", web3.toAscii(hash))
        //TODO: hashの値と違う値がVote Structに代入されていて，しかもそれは0x11...が代入されている

         //organizerの署名の作成
        //const hash = await web3.sha3("0x1100000000000000000000000000000000000000000000000000000000000000")
        const organizer_sig = await web3.eth.sign(organizer,hash)
        console.log("Organizer's sig:",organizer_sig)

        const voteId = await 0


        //TODO: signByOrganizerの値がいつの間にか変化している...console.logで表示させた内容と全然違う値がVote Structに入っている
        const tt = await vote.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tt)


        const return_address = await verifyInstance.ecverify(hash,organizer_sig)
        console.log("return_address_from_sig_and_hash:", return_address)
        assert.equal(return_address, organizer,"should match two accounts")


        //監査者のアドレスを設定
        const t = await vote.setInspectorAddr(inspector,{from:organizer})
        assert.isOk(t)

        // const voterId = await 0

        //organizerの署名を作成
        //testVoteにhasedVoteとsignByorganizerを入れたいんだけど，入ってない？
        //const organizerSignature = VoteInstance[2]
        //TODO: voterIdで呼び出すVote Structはコントラクト内ではhashVoteとして"0x11"を入れている，でも実際はweb3.sha3

        //で値を変更しているので，hashを初期値として与えた
        //const vote.votes
        //console.log(VoteInstance[2])
        //console.log(organizerSignature)

        //TODO: signByOrganizerの値がいつの間にか変化している...console.logで表示させた内容と全然違う値がVote Structに入っている
        const tx3 = await vote.signByOrganizer(voteId,organizer_sig,{from:organizer})
        assert.isOk(tx3)

        // 
        const contractAddr = await vote.address
        console.log("contract address:",contractAddr)
        //console.log("Vote Struct Instance(before sign by inspector):\n",VoteInstance)
        // const newSig = web3.toUtf8(organizer_sig)
        // console.log("newSig:",newSig)


        //監査者の署名
        const inspector_sig = await web3.eth.sign(inspector,hash)
        console.log("inspector's signature:",inspector_sig)
        const return_address_inspector = await verifyInstance.ecverify(hash,inspector_sig)
        assert.equal(return_address_inspector, inspector,"should match two accounts")

        // console.log("0:",VoteInstance[0])
        // console.log("2:",VoteInstance[2])

        const return_organizerAddr = await verifyInstance.ecverify(VoteInstance[0],VoteInstance[2])
        console.log("return_organizerAddr_from_VoteStruct:",return_organizerAddr)
        assert.equal(return_organizerAddr, organizer,"should match two accounts")
        

        // const contractOrganizerAddr = await vote.getOrganizerAddr();
        // console.log("getOrganizrAddr",contractOrganizerAddr)

        //TODO:organizerのアドレスをVote.solのアドレスを設定しないといけない


        //TODO:requireでエラー(organizerの署名が機能していない) => Vote structには違う値が代入されている => 修正した
        const txt = await vote.signByInspector(0,inspector_sig,{from:inspector}) 
        
        
        //TODO: 構造体に記入されているbytes or bytes32で　jsファイルと同じ値で格納されている値が１つもない
        //console.log(txt)
        assert.isOk(txt)

        const testInstance = await vote.votes(0)
        console.log("votes[0]\n",testInstance) 
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