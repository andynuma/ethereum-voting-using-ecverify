pragma solidity ^0.4.19;
import "./MyVerify.sol";
import "./Owned.sol";

contract vote is MyVerify {

    mapping (uint => uint) voteId;
    mapping(uint => address) public voteToOwner;
    mapping(address => uint) ownerToVote;
    mapping(address => uint) ownerVoteCount;
    mapping(address => bytes32) hashedIdCollections;
    mapping (uint => address) candidateToAddress;
    mapping(uint => uint) candidateVoteCounts;
    mapping(bytes32 => uint) firstSend;

    uint testId;
    
    // struct Voter{
    //     address voterAddr;
    // }
    
    // Voter[] voters;
    
    address[] voterAddrs;
    
    address voterAddr;
    
    //vote 
    struct Vote{
        bytes hashedVote;
        //uint candidateId;
        address voterAddr;
        address organizerAddr;
        address inspectorAddr;
        //string _signByOrganizer;
        //string _signByInspector;
    }
    
    Vote[] public votes;

    modifier onlyVoter{
        require(msg.sender == voterAddr);
        _;
    }
    
    modifier onlyInspector{
        require(msg.sender == inspectorAddr);
        _;
    }
    
    //set voter address
    function setVoterAddr(address _voterAddr) public onlyOwner{
        voterAddr = _voterAddr;

        //voterAddrs[_index] = _voterAddr;
    }
    
    function testVoter(uint count) public onlyVoter returns(uint){
        return count;
    }
    
    //create vote
    //hashしたIdを渡せば良い事に気づいた
    function createVote(bytes _hashedVote) public onlyVoter returns(uint){
        //最初はVoteのアドレス検証欄にはvoteAddrを入れておく.
        //-1する意味あるのだろうか
        //voteの
        uint id = votes.push(Vote(_hashedVote,msg.sender,msg.sender,msg.sender))-1;
        //voteToOwner[id] = msg.sender;
        //ownerToVote[msg.sender] = id;
        //ownerVoteCount[msg.sender]++;
        return id;
    }
    
    //hash voteId
    
    // function mykeccak256(uint _id) public returns(bytes32){
    //     return keccak256("_id");
    // }
    
    //(first)send vote to organizer
    //使おうと思ったけど，結局idで管理すればok
    // function sendVoteToOrganize(bytes32 _hashedId) public onlyVoter {
    //     //add organizer hashedIdCollections
    //     hashedIdCollections[msg.sender] = _hashedId;
    // }
    
    //signature by organizer
    function signByOrganizer(uint _voteId, bytes32 _hash, bytes _signature) public onlyOwner{
        //send public key and vote
        //signatureはクライアント側でweb3を使う必要あり
        //web3.eth.sign(account, hash)のaccountをOrganaizerのアドレスで実行して
        //_signatureに渡すこと
        
        Vote storage myVote = votes[_voteId];
        myVote.organizerAddr = ecverify(_hash, _signature);
        //これでorganzierのアドレスが返して，それをVoteに入れる
        /////公開鍵を投票者に送信
        
    }
    
    //send vote to onlyInspector
    //多分これはいらない
    // function sendVoteToInspector(bytes32 _hash, bytes _signature) public onlyInspector{
    //     ecverify(_hash, _signature);
    // }
    
    //signature by Inspector
    function signByInspector(uint _voteId, bytes32 _hash, bytes _signature) public onlyInspector{
        //send voter
        //send public key and vote
        //signatureはクライアント側でweb3を使う必要あり
        //web3.eth.sign(account, hash)のaccountをOrganaizerのアドレスで実行して
        //_signatureに渡すこと
        
        Vote storage myVote = votes[_voteId];
        myVote.inspectorAddr = ecverify(_hash, _signature);
        //これでorganzierのアドレスが返して，それをVoteに入れる
    }
    
    
    //send signed vote to organizer
    function voteToCandidate(uint _voteId) public onlyVoter{
        //verify
        Vote storage myVote = votes[_voteId];
        //この方法だと,myvote.organizerAddrにアドレスを設定設定しておけば票の票の偽装ができてしまう
        //myVote.organizerSigにweb3.eth.singの結果を入れるようにs変更
        //require(myVote.organizerAddr==0x0); //運営のアドレスを検査
        //require(myVote.inspectorAddr==0x0); //監視者のアドレスを検査
        //require(myVote.voterAddr == 0x0)　これは書かなくて良い（onlyVoterしているので）
        //ここから公開鍵で暗号化された投票内容（hashではない）を復号して
        
        //候補者の票とする.
        //復号はどうやってするか
        //candidateVoteCounts[_candidateId]++;
    }

    //Inspection votes
    function inspectionVote() public onlyInspector{
        //sign and address is correct ?
    }

    //count votes
    function getVote(uint _candidateId) public view onlyOwner returns(uint){
        return candidateVoteCounts[_candidateId];
    }
    
    ///////////////////test ///////////////////
    function test(uint _testId) public {
        testId = _testId;
    }

    function testreturn() public returns(uint){
        return testId;
    }
    ////////////test////////////////////////

}