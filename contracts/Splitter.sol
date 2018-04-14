pragma solidity ^0.4.17;

contract Splitter {

  address public owner;
  address public recipient1;
  address public recipient2;
  bool killed;

  function Splitter(
    address firstrecipient,
    address secondrecipient) public {

    owner = msg.sender;
    require(firstrecipient > 0);
    require(secondrecipient > 0);
    require(firstrecipient != secondrecipient);
    killed = false;
    recipient1 = firstrecipient;
    recipient2 = secondrecipient;
  }

  function split() public payable {
    require(!killed);
    require(msg.sender == owner);
    require(msg.value % 2 == 0);
    uint val = msg.value/2;
    recipient1.transfer(val);
    recipient2.transfer(val);
  }
  function() payable public {
    split();
  }
  function kill() public {
    require(msg.sender == owner);
    killed = true;
  }
}
