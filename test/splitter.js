var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function ([alice,bob,carol]) {
    let splitter;
    beforeEach('setup contract for each test', async () => {
        splitter = await Splitter.new(bob,carol)
    })
    it('has an alice', async () => {
        assert.equal(await splitter.owner(), alice)
    })
    it('has a bob', async () => {
        assert.equal(await splitter.recipient1(), bob)
    })
    it('has a carol', async () => {
        assert.equal(await splitter.recipient2(), carol)
    })

})
