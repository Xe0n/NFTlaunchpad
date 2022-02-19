import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { ethers } from "ethers";

const OnSumbit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target.form);

    axios
      .post("http://localhost:3000/", formData, {
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

const Reg = () => {
	return (
		<>
			<Container>
				<Row>
					<Col>
						<h3 className="p-3">Загрузка новой работы</h3>

					</Col>
				</Row>
				<Row>
					<Col>
						<Form className="text-start" onSubmit={OnSumbit}>
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Название</Form.Label>
								<Form.Control type="email" placeholder="Email" name="email" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Сколько хотите получить за работу</Form.Label>
								<Form.Control type="text" placeholder="Цена" name="price" />
								<Form.Text>Брокер постарается продать вашу работу за эту сумму и перечислит ее вам.</Form.Text>
							</Form.Group>
							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Ваша работа</Form.Label>
								<Form.Control type="file" name="file" />
								<Form.Text></Form.Text>
							</Form.Group>
							<Button variant="primary" type="submit">
								Отправить
							</Button>
						</Form>
					</Col>
					
				</Row>
			</Container>
		</>
	)
}

export default Reg