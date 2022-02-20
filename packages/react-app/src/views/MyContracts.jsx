import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { Col, Container, Row } from "react-bootstrap";
import { ethers } from "ethers";
import { Items } from "../components";
import axios from "axios";
import { Button, Card, List } from "antd";
import contractERC777 from "../contracts/hardhat_contracts";
const { BufferList } = require("bl");
const ipfsAPI = require("ipfs-http-client");
const { globSource } = ipfsAPI;

const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
// run your own ipfs daemon: https://docs.ipfs.io/how-to/command-line-quick-start/#install-ipfs
// const localhost = { host: "localhost", port: "5001", protocol: "http" };

const ipfs = ipfsAPI(infura);

const getFromIPFS = async hashToGet => {
  for await (const file of ipfs.get(hashToGet)) {
    //console.log(file.path);
    if (!file.content) continue;
    const content = new BufferList();
    for await (const chunk of file.content) {
      content.append(chunk);
    }
    //console.log(content);
    return content;
  }
};

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [], maxNumbers: 69, image: {}, description: {}, owned: {}, user: { } };
  }

  componentDidMount() {
    let categories = axios
      .get("http://localhost:4100/v1/users/users")
      .then(response => {
        //this.setState({ users: response.data.results });
        let user = {};
        response.data.results.forEach((item, j) => {
          if (item.address === this.props.address) {
            user = item;
            this.setState({ user: user });
          }
        });
        console.log("BBBB", user);
        user.contracts.forEach((item1, j) => {
          const tokenContract = new ethers.Contract(
            item1.tokenAddress,
            contractERC777[31337].localhost.contracts.EasyGoTreaty.abi,
            this.props.provider,
          );
          //uri = uri.replace(/{(.*?)}/, "");
          item1.uri = item1.uri.slice(0, item1.uri.length - 9);
          console.log("SHSHFDHSFDHD", item1.uri);

          const ipfsHash = item1.uri.replace("https://ipfs.io/ipfs/", "");
          const json = getFromIPFS(ipfsHash).then(jsonManifestBuffer => {
            const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
            //console.log(jsonManifest);
            let arrayer = this.state.description;
            arrayer[item1.token] = jsonManifest.description;
            this.setState({ description: arrayer });
          });
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  //const purpose = useContractReader(readContracts, "YourContract", "purpose");

  render() {
    return (
      <div>
        <h3 className="m-5 text-start">Ваши договоры</h3>
        <Container>
          <List
            grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
            dataSource={this.state.user.contracts || []}
            style={{ margin: "auto", textAlign: "center", alignItems: "center" }}
            renderItem={item1 => {
              const id = item1.id;
              return <h1>{this.state.description[item1.token]}</h1>;
            }}
          />
        </Container>
      </div>
    );
  }
}
