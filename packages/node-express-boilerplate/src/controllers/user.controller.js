const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const ethers = require('ethers');
//const ILendingPool = require('./abis/LendingPool.json');
const formidable = require('formidable');

//const LENDING_POOL = '0x7d2768dE32b0b80b7a3454c06BdAc94A69DDc7A9';

const localProvider = new ethers.providers.StaticJsonRpcProvider(  "http://localhost:8545");
const signer = new ethers.Wallet("3931d768b2f778b2b17a8611ccc0e6ee15471badd9943bf8cb45dcfb6fbd1c5f", localProvider);
//let lendingPoolContract = new ethers.Contract(LENDING_POOL, ILendingPool.abi, signer);
//const ipfsAPI = require('ipfs-http-client');
//const { globSource } = require('ipfs-http-client')
//onst ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
//import deployedContracts from "./contracts/hardhat_contracts.json";

const createBilateralTreaty = catchAsync(async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    //let deposit = await lendingPoolContract.deposit(form.assetData.tokenAddress, form.amountToDeposit, form.address, 0);

    // res.writeHead(200, { 'content-type': 'application/json' });

    const user = userService
      .createUser({
        name: fields.name,
        email: fields.email,
        typeUser: fields.typeUser,
        address: fields.address
      })
      .then((user) => {
        // res.end(JSON.stringify({ fields, files }, null, 2));
        res.status(httpStatus.CREATED).send(user);
      });

    // res.status(httpStatus.CREATED).send(user);
  });
});

const createUser = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

const addNFT = catchAsync(async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    const us = userService.getUserByAddress(fields.address).then(result => {
      console.log("aaaaaaaaaaa", result);
      result.nft.push({tokenAddress: fields.tokenAddress, quantity: fields.quantity, name: fields.name});
      const u = userService.updateUserById(result.id, { nft: result.nft }).then((user) => {
        res.send(user);
      });
    });
  });

  /*
  let form = {};
  form = req.body.form;
  form.pictureName = req.pictureName;
  form.tokenUri = tokenUri;
  result.nft.push(form);
  const user = await userService.updateUserById(result.id, { NFT: result.nft });
  res.send(user);
  */
});

const getUsers = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await userService.queryUsers(filter, options);
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const createBilateralTreatyOld = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  //let deposit = await lendingPoolContract.deposit(form.assetData.tokenAddress, form.amountToDeposit, form.address, 0);
  res.status(httpStatus.CREATED).send(user);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  createBilateralTreaty,
  addNFT,
};
