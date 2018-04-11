pragma solidity ^0.4.17;

contract Splitter {

  address public owner;
  address public recipient1;
  address public recipient2;

  function Splitter(
    address firstrecipient,
    address secondrecipient) public {

    owner = msg.sender;
    recipient1 = firstrecipient;
    recipient2 = secondrecipient;
  }
}
