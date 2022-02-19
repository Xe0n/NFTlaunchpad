import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { ethers } from "ethers";

const OnSumbit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.form);

    console.log(event.target);

    axios
      .post("http://localhost:4100/v1/users/createBilateralTreaty", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(`Success` + res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

export default class AddNFT extends React.Component {
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
    };
    this.handleChangeCollection = this.handleChangeCollection.bind(this);
   this.handleChangeDeadline = this.handleChangeDeadline.bind(this);
   this.handleChangeName = this.handleChangeName.bind(this);
   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleChangeQuantity = this.handleChangeQuantity.bind(this);
   this.handleChangeTokenAddress = this.handleChangeTokenAddress.bind(this);
   this.handleChangeTypeUser = this.handleChangeTypeUser.bind(this);
   this.handleChangeEmail = this.handleChangeEmail.bind(this);
  }

  handleChangeCollection = event => {
 console.log(event.target.value);
 this.setState({ collection: event.target.value });
};

handleChangeTypeUser = event => {
 console.log(event.target.value);
 this.setState({ typeUser: event.target.value });
};

handleChangeEmail = event => {
 console.log(event.target.value);
 this.setState({ email: event.target.value });
};

handleChangeDeadline = event => {
 console.log(event.target.value);
 this.setState({ deadline: event.target.value });
};

handleChangeName = event => {
 console.log(event.target.value);
 this.setState({ name: event.target.value });
};

handleChangeQuantity = event => {
 console.log(event.target.value);
 this.setState({ quantity: event.target.value });
};

handleChangeTokenAddress = event => {
 console.log(event.target.value);
 this.setState({ tokenAddress: event.target.value });
};

handleSubmit = event => {
 var bodyFormData = new FormData();
 console.log(
   this.state.name,
   this.state.email,
   this.state.typeUser,
   this.state.hashtag,
   this.state.deadline,
   this.state.reward,
   this.state.description,
 );
 bodyFormData.append("name", this.state.name);
 bodyFormData.append("tokenAddress", this.state.tokenAddress);
 bodyFormData.append("quantity", this.state.quantity);
 bodyFormData.append("address", this.props.address);
 axios({
   method: "post",
   url: "http://localhost:4100/v1/users/addNFT",
   data: bodyFormData,
   headers: { "Content-Type": "multipart/form-data" },
 })
   .then(function (response) {
     //handle success
     console.log(response);
   })
   .catch(function (response) {
     //handle error
     console.log(response);
   });

 console.log(bodyFormData);
 event.preventDefault();
};

onChange = (imageList, addUpdateIndex) => {
  // data for submit
  console.log(imageList, addUpdateIndex);
  this.setState({ images: imageList });
};
render() {
  return (
		<>
			<Container>
				<Row>
					<Col>
						<h3 className="p-3">Добавьте ваши токены</h3>

					</Col>
				</Row>
				<Row>
					<Col>
          
          <Form className="text-start" onSubmit={this.handleSubmit}>
    
            	<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Наименование</Form.Label>
								<Form.Control type="text" label="name" placeholder="Наименование предмета" value={this.state.name} onChange={this.handleChangeName} />
							</Form.Group>
     
              <Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Адрес токена</Form.Label>
								<Form.Control type="text" label="adress" placeholder="пример адреса NFT токена" value={this.state.tokenAddress} onChange={this.handleChangeTokenAddress} />
							</Form.Group>
        

              <Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Кол-во токенов</Form.Label>
								<Form.Control type="text" label="Quantity" placeholder="цифровое значение" value={this.state.quantity} onChange={this.handleChangeQuantity} />
							</Form.Group>
              <Button variant="success" type="submit">
                Submit
              </Button>
          </Form>
					</Col>

				</Row>
			</Container>
		</>
	)
}
}
