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
    this.state = { users: [], maxNumbers: 69, image: {}, names: {}, owned: {} };
  }

  componentDidMount() {
    let categories = axios
      .get("http://localhost:4100/v1/users/users")
      .then(response => {
        this.setState({ users: response.data.results });
        response.data.results.forEach((item, j) => {
          /*
       axios.delete("http://localhost:4100/v1/users/users", {
         data: {
          id: item.id
        }
       }).then(res => {
         console.log(res);
       })
       */
          item.nft.forEach((item1, i) => {
            const tokenContract = new ethers.Contract(
              item1.tokenAddress,
              contractERC777[31337].localhost.contracts.YourCollectible.abi,
              this.props.provider,
            );
            tokenContract.uri(0).then(uri => {
              uri = uri.replace(/{(.*?)}/, 0);
              const ipfsHash = uri.replace("https://ipfs.io/ipfs/", "");
              const json = getFromIPFS(ipfsHash).then(jsonManifestBuffer => {
                const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
                //console.log(jsonManifest);
                let arrayer = this.state.image;
                arrayer[item1.tokenAddress] = jsonManifest.image;
                this.setState({ image: arrayer });
                arrayer = this.state.names;
                arrayer[item1.tokenAddress] = jsonManifest.name;
                this.setState({ name: arrayer });
              });
            });
            /*
           let owned = tokenContract.balanceOf(this.props.address, 0).then(res => {
             console.log("HHHFH", res);
             let arrayer = this.state.owned;
             arrayer[item1.tokenAddress] = res.toNumber();
             this.setState({owned: arrayer})
           });
           */

            /*
         let tokenSupply = this.props.readContracts.tokenContract.uri(0).then(uri => {
           uri = uri.replace(/{(.*?)}/, 0);
           const ipfsHash = uri.replace("https://ipfs.io/ipfs/", "");
           const json = getFromIPFS(ipfsHash).then(jsonManifestBuffer => {
             const jsonManifest =JSON.parse(jsonManifestBuffer.toString());
             //console.log(jsonManifest);
             let arrayer = this.state.image;
             arrayer[i] = jsonManifest.image;
             this.setState({image: arrayer})
           });
         })
         */
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
    /*
    if (this.props.readContracts.YourCollectible && this.state.image === []) {
      let tokenSupply = this.props.readContracts.YourCollectible.uri(0).then(uri => {
        uri = uri.replace(/{(.*?)}/, 0);
        const ipfsHash = uri.replace("https://ipfs.io/ipfs/", "");
        const json = getFromIPFS(ipfsHash).then(jsonManifestBuffer => {
          const jsonManifest =JSON.parse(jsonManifestBuffer.toString());
          //console.log(jsonManifest);
          this.setState({image: jsonManifest.image})
        });
      })
    }
    */
    return (
      <div>
        <h3 className="m-5 text-start">Игроки предоставляющие свой шмот в аренду</h3>
        <Container>
          {/*
          <Row>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>

            <Col md="2" className="mt-4">
               <UserLink />
            </Col>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>
            <Col md="2" className="mt-4">
               <UserLink />
            </Col>

          </Row>
          */}

          <List
            dataSource={this.state.users}
            className="collectors__list clear-list"
            style={{ margin: "auto", textAlign: "center", alignItems: "center" }}
            renderItem={item => {
              const id = item.id;
              if (item.nft[0]) {
                return (
                  <List
                    grid={{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }}
                    dataSource={item.nft}
                    style={{ margin: "auto", textAlign: "center", alignItems: "center" }}
                    renderItem={item1 => {
                      const id = item1.id;
                      return (
                        <Items
                          image={this.state.image[item1.tokenAddress]}
                          name={this.state.names[item1.tokenAddress]}
                          quantity={this.state.owned[item1.tokenAddress]}
                          owner={item.address}
                          tokenAddress={item1.tokenAddress}
                        />
                      );
                    }}
                  />
                );
              } else {
                return <div> </div>;
              }
            }}
          />
        </Container>
      </div>
    );
  }
}
