import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { CryptoCards, Card, Illustration, Avatar } from "web3uikit";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { ethers } from "ethers";
import { Items } from "../components";
import { withRouter } from "react-router";
import contracter from "../contracts/contracter.json";
import contractERC777 from "../contracts/hardhat_contracts";
const ipfsAPI = require("ipfs-http-client");
const { BufferList } = require("bl");

const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
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

class SingleItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      collections: [
        {
          value: "USD",
          label: "$123123",
        },
        {
          value: "EUR",
          label: "€123123123",
        },
        {
          value: "BTC",
          label: "฿123123123",
        },
        {
          value: "JPY",
          label: "¥123123123",
        },
      ],
      secondRole: "receiver",
      firstRole: "sender",
      deposited: false
    };
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangePeriod = this.handleChangePeriod.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeSecondAddress = this.handleChangeSecondAddress.bind(this);
    this.handleChangePrice = this.handleChangePrice.bind(this);
  }

    componentDidMount() {
      const tokenContract = new ethers.Contract(
        this.props.match.params.tokenAddress,
        contractERC777[31337].localhost.contracts.EasyGoTreaty.abi,
        this.props.provider,
      );
      tokenContract.uri(0).then(uri => {
        uri = uri.replace(/{(.*?)}/, 0);
        const ipfsHash = uri.replace("https://ipfs.io/ipfs/", "");
        const json = getFromIPFS(ipfsHash).then(jsonManifestBuffer => {
          const jsonManifest = JSON.parse(jsonManifestBuffer.toString());
          console.log(jsonManifest);
          this.setState({image: jsonManifest.image});
          this.setState({name: jsonManifest.name});
        });
      });
    }

  handleChangeQuantity = event => {
    console.log(event.target.value);
    this.setState({ quantity: event.target.value });
  };

  handleChangeSecondAddress = event => {
    console.log(event.target.value);
    this.setState({ secondAddress: event.target.value });
  };

  handleChangePrice = event => {
    console.log(event.target.value);
    this.setState({ price: event.target.value });
  };

  handleChangePeriod = event => {
    console.log(event.target.value);
    this.setState({ period: event.target.value });
  };

  handleChangeName = event => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  handleChangeDescription = event => {
    console.log(event.target.value);
    this.setState({ description: event.target.value });
  };

  handleSubmit = event => {
    console.log(this.state.deposited);
    if (this.state.deposited) {
      var bodyFormData = new FormData();
      console.log(this.props.match.params.tokenAddress + " " + this.state.period + " " + this.state.quantity + " " + this.state.description)
      contracter.description = this.props.match.params.tokenAddress + " " +
       this.state.period + " " + this.state.quantity + " " + this.state.description + " " + this.state.price;
      let metaObj = contracter;
      let jsonObj = JSON.stringify(metaObj);

      //let metaRecv = ipfs.add(jsonObj);
      const file = ipfs.add(jsonObj).then(file => {
        console.log(this.props.match.params)
        const tokenUri = "https://ipfs.io/ipfs/" + file.cid.toString() + "/{id}.json";
        bodyFormData.append("firstAddress", this.props.address);
        bodyFormData.append("ipfs", tokenUri);
        bodyFormData.append("secondAddress", this.props.match.params.userAddress);
        bodyFormData.append("firstRole", "getter");
        bodyFormData.append("secondRole", "sender");
        bodyFormData.append("description", contracter.description);
        bodyFormData.append("price", this.state.price);
        axios({
          method: "post",
          url: "http://localhost:4100/v1/users/createBilateralTreaty",
          data: bodyFormData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then(function (response) {
            //handle success
            localStorage.setItem("contract", Number(response.data.hex));
            window.location.replace("http://localhost:3000/MyContracts");
          })
          .catch(function (response) {
            //handle error
            console.log(response);
          });
      });
    }

    event.preventDefault();

  };

  deposit = () => {
    let valueInEther = ethers.utils.parseEther("" + this.state.price);
    let valueInEther2 = ethers.utils.parseEther("" + this.state.period);
    console.log("BBBB", this.props.writeContracts["EasyGo"]);
    const overrides = {
      value: valueInEther
        }
    let contracter =this.props.writeContracts["EasyGo"];
    contracter.getMoney(overrides).then(res => {
      console.log("HHHH", res);
      this.setState({deposited: true});
    })

    //let approveTx = this.props.tx(this.props.writeContracts["EasyGo"]["depositerETH"](valueInEther)).then(res => {
    //});
  }

  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col>
              <Items image={this.state.image} name={this.state.name} tokenAddress={this.props.match.params.tokenAddress}/>
            </Col>
            <Col>
              <div className="mt-4">
                <p className="description text-start">Описание игрового предмета его преимущества и условия аренды</p>
                <Form className="text-start" onSubmit={this.handleSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Кол-во дней</Form.Label>
                    <Form.Control
                      type="text"
                      label="day"
                      placeholder="До 365"
                      value={this.state.period}
                      onChange={this.handleChangePeriod}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Кол-во токенов</Form.Label>
                    <Form.Control
                      type="text"
                      label="Quantity"
                      placeholder="1"
                      value={this.state.quantity}
                      onChange={this.handleChangeQuantity}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Комментарий</Form.Label>
                    <Form.Control
                      type="text"
                      label="adress"
                      placeholder="Без перепродаж"
                      value={this.state.description}
                      onChange={this.handleChangeDescription}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Цена</Form.Label>
                    <Form.Control
                      type="text"
                      label="adress"
                      placeholder="10"
                      value={this.state.price}
                      onChange={this.handleChangePrice}
                    />
                  </Form.Group>
                  <Button variant="success" type="submit" style={{backgroundColor: this.state.deposited ? "green": "red"}}>
                    Купить
                  </Button>
                </Form>
                <Button variant="success" onClick={this.deposit.bind(this)}>
                  Депозит залога
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(SingleItems);
