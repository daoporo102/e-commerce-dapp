// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Adoption {
    address[16] public adopters;

    // Include timestamp in the event
    event PetAdopted(uint indexed petId, address adopter, uint timestamp);

    function adopt(uint petId) public returns (uint) {
        require(petId >= 0 && petId < 16, "Invalid pet ID");

        adopters[petId] = msg.sender;

        emit PetAdopted(petId, msg.sender, block.timestamp);

        return petId;
    }

    // Add this function to retrieve all adopters
    function getAdopters() public view returns (address[16] memory) {
        return adopters;
    }
}
