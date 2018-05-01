require('chai').use(require('chai-as-promised')).should();
var Splitter = artifacts.require("./Splitter.sol");
var expectedExceptionPromise = require('./expected_exception_testRPC_and_geth');
let lit = (a,b) => {} 
contract('Splitter', function ([alice,bob,carol]) {

    let splitter;
    beforeEach('setup contract for each test', async () => {
        splitter = await Splitter.new({ from: alice })
    })

    it('has an alice', async () => {
        assert.equal(await splitter.owner(), alice)
    })

    it("won't allow 0 addresses", async () => {

        await expectedExceptionPromise( () => splitter.split(0,0, { from: alice, value: 10000 } ))

    })

    it('allows visibility of contract balance on web page',async () => {

        assert.equal(await web3.eth.getBalance(splitter.address),0)
    })

    it('allows visibility of alice balance on web page',async () => {

        const balance = await web3.eth.getBalance(await splitter.owner());
        assert.equal(balance.isZero(),false);
    })

    it('prevents alice sending an odd number',async () => {
        await expectedExceptionPromise( () => splitter.split(bob,carol,{ from: alice, value: 1 } ))
    })

    it('allows bob and carol to withdraw funds', async ()=>{

        const toSplit = 100000;
        const b_balance = await web3.eth.getBalance(bob);

        await splitter.split(bob,carol,{ from: alice, value: toSplit } );
        const tx = await splitter.withdraw({ from: bob});

        const b_new = await web3.eth.getBalance(bob);
        let gasCost = await web3.eth.getTransaction(tx.tx)
                .gasPrice.times(tx.receipt.gasUsed);

        assert(b_balance.plus(toSplit / 2)
               .minus(gasCost)
               .eq(b_new));
    })

    it('has a kill switch',async () => {
        await splitter.setKilled(true, { from: alice } )
        await expectedExceptionPromise(() =>splitter.split(bob,carol, { from: alice, value: 1 } ));

    })

})
