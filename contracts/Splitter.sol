pragma solidity ^0.4.17;

contract Splitter {

  address public owner;

  bool private killed;
  mapping (address => uint) private balances;

  event SplitEvent(address indexed payer,uint amount,address indexed payee1,address indexed payee2);
  event WithdrawEvent(uint amount, address indexed payee);

  function Splitter() public {
    owner = msg.sender;
  }

  function split(address firstRecipient,
                 address secondRecipient) public payable {

    require(!killed);
    require(msg.sender == owner);
    require(msg.value % 2 == 0);
    require(firstRecipient != 0);
    require(secondRecipient != 0);
    require(firstRecipient != secondRecipient);

    uint toPay = msg.value/2;
    updateBalanceOfRecipient(toPay,firstRecipient);
    updateBalanceOfRecipient(toPay,secondRecipient);
    SplitEvent(owner,toPay,firstRecipient,secondRecipient);
  }

  function updateBalanceOfRecipient(uint toPay,address recipient) private {
    uint bal = balances[recipient];
    uint newBal = toPay + bal;
    assert(newBal > bal);
    balances[recipient] = newBal;
  }

  function withdraw() public {

    uint balance = balances[msg.sender];
    require(balance > 0);
    balances[msg.sender] = 0;
    WithdrawEvent(balance,msg.sender);
    msg.sender.transfer(balance);

  }

  function kill() public {
    require(msg.sender == owner);
    killed = true;
  }
}
