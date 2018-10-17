pragma solidity ^0.4.19;
import "./MyVerify.sol";
import "./Owned.sol";

contract Vote is MyVerify {

    //mapping (uint => uint) voteId;
    mapping(uint => address) public voteToOwner;
    mapping(address => uint) ownerToVote;
    mapping(address => uint) ownerVoteCount;
    mapping(address => bytes32) hashedIdCollections;
    mapping (uint => address) candidateToAddress;
    mapping(uint => uint) candidateVoteCounts;
    mapping(bytes32 => uint) firstSend;

    uint testId = 1;
    
    address voterAddr;
    address organizerAddr;
    address inspectorAddr;

    constructor(){
        organizerAddr = msg.sender;
    }
    
    //vote 
    struct Vote{
        bytes32 hashedVote;
        address voterAddr;
        bytes signByOrganizer;
        bytes signByInspector;
        uint publickey1;
        uint publickey2;
    }
    
    Vote[] public votes;

    mapping(uint => Vote) public ballots;

    modifier onlyVoter{
        require(msg.sender == voterAddr);
        _;
    }

    modifier onlyInspector{
        require(msg.sender == inspectorAddr);
        _;
    }
    
    ///test 
    function test(uint _testId) public {
        testId = _testId;
    }

    //test
    function testreturn() public returns(uint){
        return testId;
    }
    //test
    function setInspectorAddr(address _inspectorAddr) public onlyOwner{
        inspectorAddr = _inspectorAddr;
    }
    //test///
    function checkVoterAddr() public returns(address){
        return voterAddr;
    }

    //test
    function getOwner() public returns (address){
        return ownerAddr;
    }
    
    //test
    function testVoter(uint count) public onlyVoter returns(uint){
        return count;
    }

    //test 
    function getVoteSignByOrganizer(uint _voteId) public returns(bytes){
        return votes[_voteId].signByOrganizer;
    }

    //test 
    function getVoteFromId(uint _voteId) public returns(bytes32,address,bytes,bytes,uint,uint){
        return (
            votes[_voteId].hashedVote,
            votes[_voteId].voterAddr,
            votes[_voteId].signByOrganizer,
            votes[_voteId].signByInspector,
            votes[_voteId].publickey1,
            votes[_voteId].publickey2
        );
    }

    //test
    function getOrganizerAddr() public returns(address){
        return organizerAddr;
    } 
    //set voter address
    function setVoterAddr(address _voterAddr) public onlyOwner{
        voterAddr = _voterAddr;
        //voterAddrs[_index] = _voterAddr;
    }
    function createVote(bytes32 _hashedVote) public onlyVoter returns(uint){
        //票の初期化
        uint id = votes.push(Vote(_hashedVote,msg.sender,"0x0","0x0",0,0))-1;
        //票と投票者の紐付け
        voteToOwner[id] = msg.sender;
        return id;
    }
    
    function signByOrganizer(uint _voteId, bytes _signature) public onlyOwner{
        /*
        signatureはクライアント側でweb3を使う必要あり
        _signature = web3.eth.sign(account, hash)
        */
        
        votes[_voteId].signByOrganizer = _signature;

        //myVote.signByOrganizer = _signature;
        //これでorganzierのアドレスが返して，それをVoteに入れる
        /////公開鍵を投票者に送信
        //RSAで実装
        //仮の公開鍵として(7,11)を設定しておく
        votes[_voteId].publickey1 = 7;
        votes[_voteId].publickey2 = 11;

        //ECCでの実装はまだ
        
    }
    
    //signature by Inspector
    function signByInspector(uint _voteId, bytes _signature) public onlyInspector{
        //send voter
        //send public key and vote
        //signatureはクライアント側でweb3を使う必要あり
        //web3.eth.sign(account, hash)のaccountをOrganaizerのアドレスで実行して
        //_signatureに渡すこと
        
        //Vote storage myVote = votes[_voteId];
        //TODO:運営の署名の検証
        require(organizerAddr == ecverify(votes[_voteId].hashedVote,votes[_voteId].signByOrganizer));
        //投票者の確認
        //未実装
        //署名
        //myVote.signByInspector = _signature;
        votes[_voteId].signByInspector = _signature;
    }
    
    function voteToCandidate(uint _voteId) public onlyVoter{
        //Vote.organizerSigの内容をecverifyで確認する
        Vote storage myVote = votes[_voteId];
        require(inspectorAddr == ecverify(myVote.hashedVote, myVote.signByInspector));

        //ここから公開鍵で暗号化された投票内容（hashではない）を復号
        //hashedVoteを復号する.と思ったけど，復号はクライアント側でやってもらう事にする.
        //candidateVoteCounts[_candidateId]++;
    }


    //count votes
    function getVote(uint _candidateId) public view onlyOwner returns(uint){
        return candidateVoteCounts[_candidateId];
    }


}