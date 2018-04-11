pragma solidity ^0.4.17;

contract Splitter {

         address public alice;

         function Splitter() public {
                alice = msg.sender;
         }

}
