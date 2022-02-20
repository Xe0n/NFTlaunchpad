import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { Col, Container, Row } from "react-bootstrap";
import { ethers } from "ethers";
import { Items } from "../components";
import axios from "axios";
import { Button, Card, List } from "antd";
import contractERC777 from "../contracts/hardhat_contracts";
import contracter from "../contracts/contracter.json";
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
    this.state = { users: [], maxNumbers: 69, image: {}, description: {}, owned: {}, user: {} };
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
        user.contarctsForApprove.forEach((item1, j) => {
          console.log("AAAAAAA", item1);
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }

  sumbitApprove = treaty => {
    console.log(treaty);
    var bodyFormData = new FormData();
    //let metaRecv = ipfs.add(jsonObj);
    bodyFormData.append("firstAddress", this.props.address);
    bodyFormData.append("secondAddress", treaty.getter);
    bodyFormData.append("firstRole", "sender");
    bodyFormData.append("secondRole", "getter");
    bodyFormData.append("description", treaty.description);
    axios({
      method: "post",
      url: "http://localhost:4100/v1/users/createBilateralTreaty",
      data: bodyFormData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        localStorage.setItem("contract", Number(response.data.hex));
        console.log("AAAAAA", Number(response.data.hex));
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

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
            dataSource={this.state.user.contarctsForApprove || []}
            style={{ margin: "auto", textAlign: "center", alignItems: "center" }}
            renderItem={item1 => {
              const id = item1.id;
              return (
                <Container>
                  <Row>
                    <Card>
                      <div className="text-start">
                        <h2>Договор № {item1.id}</h2>
                        <p><b>Условия договора</b></p>
                      </div>
                      {item1.description} <br />
                      <Button onClick={this.sumbitApprove.bind(this, item1)}>Approve</Button>
                    </Card>
                  </Row>
                </Container>
              );
            }}
          />
        </Container>
      </div>
    );
  }
}
