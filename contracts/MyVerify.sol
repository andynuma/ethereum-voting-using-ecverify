pragma solidity ^0.4.18;
import "./Owned.sol";

contract MyVerify is Owned{

    function ecverify(bytes32 hash, bytes signature) public pure returns(address sig_address) {
        //署名したアドレスが返り値
        require(signature.length == 65);

        bytes32 r;
        bytes32 s;
        uint8 v;

        assembly {
          r := mload(add(signature, 32))
          s := mload(add(signature, 64))
          v := byte(0, mload(add(signature, 96)))
        }

        if (v < 27) {
            v += 27;
        }

        // prefixを考慮
        bytes memory prefix = "\x19Ethereum Signed Message:\n32";
        bytes32 prefixedHash = keccak256(prefix, hash);

        // v の長さ
        require(v == 27 || v == 28);
        sig_address = ecrecover(prefixedHash, v, r, s);

        require(sig_address != 0x0);
    }
}