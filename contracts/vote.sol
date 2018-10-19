pragma solidity ^0.4.19;
import "./MyVerify.sol";
import "./Owned.sol";

contract Vote is MyVerify {

    //mapping (uint => uint) voteId;
    mapping(uint => address) public voteToOwner;
    mapping(address => uint) public voterVoteCount;
    mapping(address => bytes) resultOfHashedVote;
    mapping(address => uint) public addressToResult;
    
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

        voterVoteCount[msg.sender] += 1;
        return id;
    }
    
    function signByOrganizer(uint _voteId, bytes _signature) public onlyOwner{
        /*
        signatureはクライアント側でweb3を使う必要あり
        _signature = web3.eth.sign(account, hash)
        */
        
        votes[_voteId].signByOrganizer = _signature;

        //これでorganzierのアドレスが返して，それをVoteに入れる
        /////公開鍵を投票者に送信
        //RSAで実装
        //仮の公開鍵として(7,11)を設定しておく
        votes[_voteId].publickey1 = 7;
        votes[_voteId].publickey2 = 11;

        //ECCでの実装はまだ
        
    }

    //set inspector address
    function setInspectorAddr(address _inspectorAddr) public onlyOwner{
        inspectorAddr = _inspectorAddr;
    }
    
    //signature by Inspector
    function signByInspector(uint _voteId, bytes _signature) public onlyInspector{
        //send voter
        //send public key and vote
        //signatureはクライアント側でweb3を使う必要あり
        //web3.eth.sign(account, hash)のaccountをOrganaizerのアドレスで実行して
        //_signatureに渡すこと
        
        require(organizerAddr == ecverify(votes[_voteId].hashedVote,votes[_voteId].signByOrganizer));
        votes[_voteId].signByInspector = _signature;
    }
    
    function sendToOrganizer(bytes _pkV, uint _voteId) public onlyVoter{
        //Vote.organizerSigの内容をecverifyで確認する
       //Vote storage myVote = votes[_voteId];

        require(organizerAddr == ecverify(votes[_voteId].hashedVote,votes[_voteId].signByOrganizer));
        require(inspectorAddr == ecverify(votes[_voteId].hashedVote, votes[_voteId].signByInspector));

        resultOfHashedVote[msg.sender] = _pkV;
    }

    // organizer send address and candidateId 
    function voteToCandidate(address _address, uint _candidateId) public onlyOwner{
        addressToResult[_address] = _candidateId;
    }

    // everyone can view result
    function viewResult(address _voterAddr) public view returns(uint){
        return addressToResult[_voterAddr];
    }

}