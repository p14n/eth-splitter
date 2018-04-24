pragma solidity ^0.4.17;

contract Splitter {

  address public owner;
  address[] public recipients = new address[](2);
  bool private killed;
  mapping (address => uint) private balances;

  event SplitEvent(uint amount);
  event WithdrawEvent(uint amount, address payee);
    
  function Splitter(
    address firstrecipient,
    address secondrecipient) public {

    owner = msg.sender;
    require(firstrecipient > 0);
    require(secondrecipient > 0);
    require(firstrecipient != secondrecipient);
    recipients[0] = firstrecipient;
    recipients[1] = secondrecipient;
  }

  function split() public payable {

    require(!killed);
    require(msg.sender == owner);
    require(msg.value % 2 == 0);

    uint toPay = msg.value/2;
    uint newBal1 = newBalanceOfRecipient(toPay,0);
    uint newBal2 = newBalanceOfRecipient(toPay,1);

    balances[recipients[0]] = newBal1;
    balances[recipients[1]] = newBal2;
    SplitEvent(toPay);
  }

  function newBalanceOfRecipient(uint toPay,uint index) private view returns (uint) {
    uint bal = balances[recipients[index]];
    uint newBal = toPay + bal;
    assert(newBal > bal);
    return newBal;
  }

  function recipientBalance() view public returns(uint) {
    return balances[msg.sender];
  }

  function withdraw() public {

    uint balance = balances[msg.sender];
    require(balance > 0);
    balances[msg.sender] = 0;
    msg.sender.transfer(balance);
    WithdrawEvent(balance,msg.sender);

  }

  function kill() public {
    require(msg.sender == owner);
    killed = true;
  }
}
