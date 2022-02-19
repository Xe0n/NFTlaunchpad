import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { CryptoCards, Card, Illustration } from 'web3uikit';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { ethers } from "ethers";

const Broker = () => {
    return (
        <>
        <Container>
				<Row>
					<Col>
						<h3 className="p-3">Добро пожаловать, нам нужно узнать о вас чуть больше</h3>
					</Col>
				</Row>
                <Row> 
                        <Form className="text-start" >
							<Form.Group className="mb-3" controlId="formBasicEmail">
								<Form.Label>Ваш Email</Form.Label>
								<Form.Control type="email" placeholder="Email" name="email" />
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Label>Ваш псевдоним</Form.Label>
								<Form.Control type="text" placeholder="Псевдоним" />
							</Form.Group>
							<Button variant="primary" type="submit">
								Отправить
							</Button>
						</Form>
                </Row>
        </Container>
        </>
    )
}

export default Broker