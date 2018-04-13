require('chai').use(require('chai-as-promised')).should();
var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function ([alice,bob,carol]) {
    let splitter;
    beforeEach('setup contract for each test', async () => {
        splitter = await Splitter.new(bob,carol, { from: alice })
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

    it("won't allow 0 addresses", async () => {
        await Splitter.new(0,0, { from: alice })
            .should.be.rejectedWith("VM Exception while processing transaction: revert");
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
    it('allows alice to split her ether from a web page',async () => {
        const a_balance = await web3.eth.getBalance(await splitter.owner());
        const b_balance = await web3.eth.getBalance(await splitter.recipient1());
        const c_balance = await web3.eth.getBalance(await splitter.recipient2());
        assert.equal(a_balance.isZero(),false);
        await splitter.split( { from: alice, value: 2 } );
        const a_new = await web3.eth.getBalance(await splitter.owner());
        const b_new = await web3.eth.getBalance(await splitter.recipient1());
        const c_new = await web3.eth.getBalance(await splitter.recipient2());

        assert.equal(b_new.toString(10),await b_balance.plus(1).toString(10));
        assert.equal(c_new.toString(10),await c_balance.plus(1).toString(10));
        assert.notEqual(a_new.toString(10),a_balance.toString(10));

    })
})
