const MyVerify = artifacts.require("../contracts/MyVerify.sol")

contract('MyVerify', function (accounts) {
  it("verify test", async () => {
    const instance = await MyVerify.new()
    const account = accounts[0]
    const hash = web3.sha3("1")
    const sig = web3.eth.sign(account, hash)

    const return_address = await instance.ecverify(hash, sig)
    assert.equal(return_address, account)

  })
});