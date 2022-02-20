
//SPDX-License-Identifier: unlicense
pragma solidity >=0.8.10;


import "./WETHGateway.sol";

contract EasyGo {


    address public owner;
    address wethGate = 0xA61ca04DF33B72b235a8A28CfB535bb7A5271B70;
    WETHGateway  iweth = WETHGateway (payable (address(wethGate)));
    address lendingPool = 0xE0fBa4Fc209b4948668006B2bE61711b7f465bAe;
    address public pool_;


    constructor() {
        owner = msg.sender;
    }

    struct LockedAccount {
        uint256 amountETH;
        uint256 startTime;
        uint256 endTime;
    }

    mapping(address => LockedAccount) public lockedAccounts;

    function depositerETH() public payable {
            LockedAccount memory _lockedAccounts = LockedAccount({
                amountETH: msg.value,
                startTime: block.timestamp,
                endTime: block.timestamp + 60
            });
            lockedAccounts[msg.sender] = _lockedAccounts;
    }

    //передавать время в минутах
    function getMoney(uint _timeLock) public payable {

        LockedAccount memory _lockedAccounts = LockedAccount({
            amountETH: msg.value,
            startTime: block.timestamp,
            endTime: block.timestamp + (_timeLock * 60)
        });
        lockedAccounts[msg.sender] = _lockedAccounts;
        depositETH(_lockedAccounts.amountETH);
    }

    function depositETH(uint256 _amountETH) internal {

        uint256 amount = _amountETH;
        address onBehalfOf = msg.sender;
        uint16 referralCode = 0;

        iweth.depositETH{value:amount}(
            lendingPool,
            onBehalfOf,
            referralCode
            );
        pool_ = address(iweth.getWETHAddress());
        }

    function withdrawETH(address _to) public {
        LockedAccount memory _lockedAccounts = lockedAccounts[_to];
        require(_lockedAccounts.endTime < block.timestamp, "time of locking isn't over");
        iweth.withdrawETH(lendingPool, 1000, _to);
    }


    fallback() external payable {
        revert('Fallback not allowed');
    }
}
