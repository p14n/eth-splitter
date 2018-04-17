require('chai').use(require('chai-as-promised')).should();
var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function ([alice,bob,carol]) {

    let splitter;
    beforeEach('setup contract for each test', async () => {
        splitter = await Splitter.new(bob,carol, { from: alice })
    })

    it('has an alice', async () => {
        assert.equal(await splitter.owner(), alice)
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

    it('allows visibility of alice balance on web page',async () => {

        const balance = await web3.eth.getBalance(await splitter.owner());
        assert.equal(balance.isZero(),false);
    })


    it('prevents alice sending an odd number',async () => {
        await splitter.split( { from: alice, value: 1 } )
            .should.be.rejectedWith("VM Exception while processing transaction: revert");
    })

    it('allows alice to split her ether by sending to the contract',async () => {

        const c_balance = await web3.eth.getBalance(carol);
        await web3.eth.sendTransaction( {
            from: alice,
            to: splitter.address,
            value: 100000 } );
        const tx = await splitter.withdraw({ from: carol,gasPrice:1 });
        const c_new = await web3.eth.getBalance(carol);
        assert(c_balance.plus(50000).minus(tx.receipt.gasUsed).eq(c_new));


    })

    it('allows bob and carol to withdraw funds', async ()=>{
        const toSplit = 100000;
        const b_balance = await web3.eth.getBalance(bob);
        await splitter.split( { from: alice, value: toSplit } );
        const tx = await splitter.withdraw({ from: bob,gasPrice:1 });
        const b_new = await web3.eth.getBalance(bob);
        assert(b_balance.plus(50000).minus(tx.receipt.gasUsed).eq(b_new));
    })

    it('has a kill switch',async () => {
        await splitter.kill( { from: alice } )
        await splitter.split( { from: alice, value: 1 } )
            .should.be.rejectedWith("VM Exception while processing transaction: revert");

    })

})
