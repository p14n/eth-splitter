pragma solidity ^0.4.17;

contract Splitter {

  address public owner;

  bool private killed;
  mapping (address => uint) private balances;

  event SplitEvent(uint amount);
  event WithdrawEvent(uint amount, address payee);
    
  function Splitter() public {
    owner = msg.sender;
  }

  function split(address firstRecipient,
                 address secondRecipient) public payable {

    require(!killed);
    require(msg.sender == owner);
    require(msg.value % 2 == 0);
    require(firstRecipient > 0);
    require(secondRecipient > 0);
    require(firstRecipient != secondRecipient);

    uint toPay = msg.value/2;
    uint newBal1 = newBalanceOfRecipient(toPay,firstRecipient);
    uint newBal2 = newBalanceOfRecipient(toPay,secondRecipient);

    balances[firstRecipient] = newBal1;
    balances[secondRecipient] = newBal2;
    SplitEvent(toPay);
  }

  function newBalanceOfRecipient(uint toPay,address recipient) private view returns (uint) {
    uint bal = balances[recipient];
    uint newBal = toPay + bal;
    assert(newBal > bal);
    return newBal;
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
