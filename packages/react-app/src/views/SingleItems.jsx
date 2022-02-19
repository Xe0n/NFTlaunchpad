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
const ipfsAPI = require("ipfs-http-client");

const infura = { host: "ipfs.infura.io", port: "5001", protocol: "https" };
const ipfs = ipfsAPI(infura);

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
    };
    this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
    this.handleChangePeriod = this.handleChangePeriod.bind(this);
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeSecondAddress = this.handleChangeSecondAddress.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleChangeQuantity = event => {
    console.log(event.target.value);
    this.setState({ quantity: event.target.value });
  };

  handleChangeSecondAddress = event => {
    console.log(event.target.value);
    this.setState({ secondAddress: event.target.value });
  };

  handleChangeEmail = event => {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
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
    var bodyFormData = new FormData();
    console.log(this.props.match.params.tokenAddress + " " + this.state.period + " " + this.state.quantity + " " + this.state.description)
    contracter.description = this.props.match.params.tokenAddress + " " + this.state.period + " " + this.state.quantity + " " + this.state.description;
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
    });

    console.log(bodyFormData);
    event.preventDefault();

  };

  render() {
    return (
      <>
        <Container>
          <Row className="mt-5">
            <Col>
              <Items />
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
                  <Button variant="success" type="submit">
                    Купить
                  </Button>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default withRouter(SingleItems);