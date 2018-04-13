pragma solidity ^0.4.17;

contract Splitter {

  address public owner;
  address public recipient1;
  address public recipient2;

  function Splitter(
    address firstrecipient,
    address secondrecipient) public {

    owner = msg.sender;
    require(firstrecipient > 0);
    require(secondrecipient > 0);
    recipient1 = firstrecipient;
    recipient2 = secondrecipient;
  }

  function split() public payable {
    require(msg.sender == owner);
    uint val = msg.value/2;
    recipient1.transfer(val);
    recipient2.transfer(val);
  }
}
