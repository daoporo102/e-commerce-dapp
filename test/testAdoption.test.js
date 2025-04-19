const Adoption = artifacts.require("Adoption");

contract('Adoption', (accounts) =>{
    let adoption;
    let expectedAdopter ;

    before(async () => {
        adoption = await Adoption.deployed();
    });

    describe("Adopting a pet and retrieving account address", async () => {
        before("Adopt a pet using account[0]", async () => {
            await adoption.adopt(8, { from: accounts[0] });
            expectedAdopter = accounts[0];
        });
        it("can fetch the address of an owner by pet id", async () => {
            const adopter = await adoption.adopters(8);
            assert.equal(adopter, expectedAdopter, "This owner of the adopter pet should be the first account");
        });
        it("can fetch the collection of all pet owner addresses", async () => {
            const adopters = await adoption.getAdopters();
            assert.equal(adopters[8], expectedAdopter, "The owner of the adopted pet should be in the collection");
        });
    });
});
