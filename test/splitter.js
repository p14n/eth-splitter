var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function ([alice,bob,carol]) {
    let splitter;
    beforeEach('setup contract for each test', async () => {
        splitter = await Splitter.new(bob,carol)
    })

    //there are 3 people: Alice, Bob and Carol.
    it('has an alice', async () => {
        assert.equal(await splitter.owner(), alice)
    })
    it('has a bob', async () => {
        assert.equal(await splitter.recipient1(), bob)
    })
    it('has a carol', async () => {
        assert.equal(await splitter.recipient2(), carol)
    })

    it('allows visibility of contract balance on web page',async () => {

        assert.equal(await web3.eth.getBalance(splitter.address),0)
    })
    it('allows visibility of alice balance on web page',async () => {

        const balance = await web3.eth.getBalance(await splitter.owner());
        assert.equal(balance.isZero(),false);
    })
    it('allows visibility of bob balance on web page',async () => {

        const balance = await web3.eth.getBalance(await splitter.recipient1());
        assert.equal(balance.isZero(),false);
    })
    it('allows visibility of carol balance on web page',async () => {

        const balance = await web3.eth.getBalance(await splitter.recipient2());
        assert.equal(balance.isZero(),false);
    })
    //whenever Alice sends ether to the contract, half of it goes to Bob and the other half to Carol.
    

//Alice can use the Web page to split her ether.
})
