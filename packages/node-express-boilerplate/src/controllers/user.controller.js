const httpStatus = require('http-status');
const ethers = require('ethers');
const formidable = require('formidable');
const ipfsAPI = require('ipfs-http-client');
const { globSource } = require('ipfs-http-client');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { NETWORKS } = require('../../constants.js');
const yourCollectible = require('../contracts/YourCollectible.abi.js');
const yourCollectibleAddress = require('../contracts/YourCollectible.address.js');
const contracter = require('./contracter.json');

const localProvider = new ethers.providers.StaticJsonRpcProvider('http://localhost:8545');
const signer = new ethers.Wallet('2804c406471e1b09b9fd25dcff52c2926e30560db15d18be3fd74983d8e386ff', localProvider);
const tokenContract = new ethers.Contract(yourCollectibleAddress, yourCollectible, localProvider);
const tokenSigner = tokenContract.connect(signer);

const ipfs = ipfsAPI({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });
// import deployedContracts from "./contracts/hardhat_contracts.json";

const createUser2 = catchAsync(async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, (err, fields, files) => {
    console.log(fields);
    // let deposit = await lendingPoolContract.deposit(form.assetData.tokenAddress, form.amountToDeposit, form.address, 0);

    // res.writeHead(200, { 'content-type': 'application/json' });

    const user = userService
      .createUser({
        name: fields.name,
        email: fields.email,
        typeUser: fields.typeUser,
        address: fields.address,
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
    const us = userService.getUserByAddress(fields.address).then((result) => {
      console.log('aaaaaaaaaaa', result);
      result.nft.push({ tokenAddress: fields.tokenAddress, quantity: fields.quantity, name: fields.name });
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
  result.results.forEach((item, i) => {
    console.log('aaaaaaa', item.contarctsForApprove, item.address);
  });
  res.send(result);
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});

const createBilateralTreaty = catchAsync(async (req, res) => {
  const form = formidable({ multiples: true });
  let passedCheck = false;
  let treaty = {};
  form.parse(req, (err, fields, files) => {
    if (fields.firstRole === 'sender') {
      const us = userService.getUserByAddress(fields.firstAddress).then((result) => {
        result.contarctsForApprove.forEach((item) => {
          if (fields.description === item.description && fields.secondAddress === item.getter) {
            passedCheck = true;
            treaty = item;
          }
        });
        if (!passedCheck) {
          result.contarctsForApprove.push({
            description: fields.description,
            getter: fields.secondAddress,
            firstAddress: fields.firstAddress,
            secondAddress: fields.secondAddress,
            role: fields.firstRole,
            tokenAddress: yourCollectibleAddress,
            uri: fields.ipfs,
          });
          const u = userService.updateUserById(result.id, { contarctsForApprove: result.contarctsForApprove });
        }
      });
    } else {
      const us = userService.getUserByAddress(fields.secondAddress).then((result) => {
        result.contarctsForApprove.forEach((item) => {
          if (fields.description === item.description && fields.firstAddress === item.getter) {
            passedCheck = true;
            treaty = item;
          }
        });
        if (!passedCheck) {
          result.contarctsForApprove.push({
            description: fields.description,
            getter: fields.firstAddress,
            firstAddress: fields.firstAddress,
            secondAddress: fields.secondAddress,
            role: fields.firstRole,
            tokenAddress: yourCollectibleAddress,
            uri: fields.ipfs,
          });
          const u = userService.updateUserById(result.id, { contarctsForApprove: result.contarctsForApprove });
        }
      });
    }
    if (passedCheck) {
      try {
        tokenSigner.mint(treaty.firstAddress, treaty.secondAddress, 0, 1, treaty.ipfs, [], { gasLimit: 400000 });
      } catch (err) {
        console.err(err);
      }
      const tokenID1 = tokenSigner.getCurrentTokenID().then((tokenID) => {
        const us = userService.getUserByAddress(treaty.firstAddress).then((result) => {
          result.contracts.push({
            firstAddress: treaty.firstAddress,
            secondAddress: treaty.secondAddress,
            role: treaty.firstRole,
            description: treaty.description,
            token: Number(tokenID),
            tokenAddress: yourCollectibleAddress,
            uri: treaty.ipfs,
          });
          const u = userService.updateUserById(result.id, { contracts: result.contracts });
        });
        const us1 = userService.getUserByAddress(treaty.secondAddress).then((result) => {
          result.contracts.push({
            firstAddress: treaty.firstAddress,
            secondAddress: treaty.secondAddress,
            role: treaty.secondRole,
            description: treaty.description,
            token: Number(tokenID),
            tokenAddress: yourCollectibleAddress,
            uri: treaty.ipfs,
          });
          const u = userService.updateUserById(result.id, { contracts: result.contracts });
        });
        res.status(httpStatus.CREATED).send(tokenID);
      });
    }
  });
  // const user = await userService.createUser(req.body);
  // let deposit = await lendingPoolContract.deposit(form.assetData.tokenAddress, form.amountToDeposit, form.address, 0);
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  res.send(user);
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.body.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  createUser2,
  deleteUser,
  createBilateralTreaty,
  addNFT,
};
