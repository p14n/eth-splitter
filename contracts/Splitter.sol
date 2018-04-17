pragma solidity ^0.4.17;

contract Splitter {

  address public owner;
  address[] private recipients = new address[](2);
  bool private killed;
  mapping (address => uint) private balances;

  function Splitter(
    address firstrecipient,
    address secondrecipient) public {

    owner = msg.sender;
    require(firstrecipient > 0);
    require(secondrecipient > 0);
    require(firstrecipient != secondrecipient);
    killed = false;
    balances[firstrecipient] = 0;
    balances[secondrecipient] = 0;
    recipients[0] = firstrecipient;
    recipients[1] = secondrecipient;
  }

  function split() public payable {

    require(!killed);
    require(msg.sender == owner);
    require(msg.value % 2 == 0);

    uint toPay = msg.value/2;

    uint bal1 = balances[recipients[0]];
    uint newBal1 = toPay + bal1;
    assert(newBal1 > bal1);

    uint bal2 = balances[recipients[1]];
    uint newBal2 = toPay + bal2;
    assert(newBal2 > bal2);

    balances[recipients[0]] = newBal1;
    balances[recipients[1]] = newBal2;

  }

  function recipientBalance() view public returns(uint) {
    return balances[msg.sender];
  }

  function withdraw() public {

    uint balance = balances[msg.sender];
    require(balance > 0);
    balances[msg.sender] = 0;
    msg.sender.transfer(balance);

  }

  function() payable public {
    split();
  }
  function kill() public {
    require(msg.sender == owner);
    killed = true;
  }
}
