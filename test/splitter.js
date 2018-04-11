var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function ([alice,bob,carol]) {
    let splitter;
    beforeEach('setup contract for each test', async () => {
        splitter = await Splitter.new()
    })
    it('has an alice', async () => {
        assert.equal(await splitter.alice(), alice)
    })

})
