pragma solidity ^0.4.19;

contract Owned {
    address public ownerAddr;
    address public voterAddr;
    address public inspectorAddr;

    //ownerAddrを設定
    function Owned() internal {
        ownerAddr = msg.sender;
    }
    
    
    modifier onlyOwner(){
        require(msg.sender == ownerAddr);
        _;
    }

    // modifier onlyVoter(){
    //     require(msg.sender == voterAddr);
    //     _;
    // }
    
    // modifier onlyInspector(){
    //     require(msg.sender == inspectorAddr);
    //     _;
    // }


    function transferOwnership(address _newOwner) public onlyOwner{
        // Only the current owner can set a new ownerAddr:
        require(msg.sender == ownerAddr);
        
        // The new address cannot be null:
        require(_newOwner != address(0));

        ownerAddr = _newOwner;
    }
}