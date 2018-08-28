pragma solidity ^0.4.19;
import "./MyVerify.sol";
import "./Owned.sol";

contract vote is MyVerify {

    //mapping (uint => uint) voteId;
    mapping(uint => address) public voteToOwner;
    mapping(address => uint) ownerToVote;
    mapping(address => uint) ownerVoteCount;
    mapping(address => bytes32) hashedIdCollections;
    mapping (uint => address) candidateToAddress;
    mapping(uint => uint) candidateVoteCounts;
    mapping(bytes32 => uint) firstSend;

    uint testId;
    
    address voterAddr;
    address organizerAddr;
    
    //vote 
    struct Vote{
        bytes32 hashedVote;
        address voterAddr;
        bytes signByOrganizer;
        bytes signByInspector;
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
    
    function createVote(bytes32 _hashedVote) public onlyVoter returns(uint){
        //票の初期化
        uint id = votes.push(Vote(_hashedVote,msg.sender,"0x0","0x0"))-1;
        //票と投票者の紐付け
        voteToOwner[id] = msg.sender;
        return id;
    }
    
    function signByOrganizer(uint _voteId, bytes _signature) public onlyOwner{
        /*
        signatureはクライアント側でweb3を使う必要あり
        _signature = web3.eth.sign(account, hash)
        */
        
        Vote storage myVote = votes[_voteId];
        myVote.signByOrganizer = _signature;
        //これでorganzierのアドレスが返して，それをVoteに入れる
        /////公開鍵を投票者に送信
        
    }
    
    //signature by Inspector
    function signByInspector(uint _voteId, bytes _signature) public onlyInspector{
        //send voter
        //send public key and vote
        //signatureはクライアント側でweb3を使う必要あり
        //web3.eth.sign(account, hash)のaccountをOrganaizerのアドレスで実行して
        //_signatureに渡すこと
        
        Vote storage myVote = votes[_voteId];
        //運営の署名の検証
        require(organizerAddr == ecverify(myVote.hashedVote,myVote.signByOrganizer) );
        //投票者の確認
        //未実装
        //署名
        myVote.signByInspector = _signature;
    }
    
    function voteToCandidate(uint _voteId) public onlyVoter{
        //Vote.organizerSigの内容をecverifyで確認する
        Vote storage myVote = votes[_voteId];
        require(inspectorAddr == ecverify(myVote.hashedVote, myVote.signByInspector));
        //ここから公開鍵で暗号化された投票内容（hashではない）を復号
        //hashedVoteを復号する.
        //candidateVoteCounts[_candidateId]++;
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