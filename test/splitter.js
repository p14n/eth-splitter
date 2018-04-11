var Splitter = artifacts.require("./Splitter.sol");

contract('Splitter', function(accounts) {
    it("should do nothing", function() {
        return Splitter.deployed().then(function(instance) {
            return true;
        }).then(function(thing) {
            assert.equal(true,thing, "fact not fact");
        });
    });
});

