const MyVerify = artifacts.require("../contracts/MyVerify.sol")

contract('MyVerify', function (accounts) {
  it("verify test", async () => {
    const instance = await MyVerify.new()
    const account = accounts[1]
    const hash = web3.sha3("0x1100000000000000000000000000000000000000000000000000000000000000")
    const sig = web3.eth.sign(account, hash)
    //console.log(sig)

    const return_address = await instance.ecverify(hash, sig)
    assert.equal(return_address, account)

  })
});