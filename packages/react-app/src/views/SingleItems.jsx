import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { CryptoCards, Card, Illustration, Avatar } from 'web3uikit';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { ethers } from "ethers";
import { Items } from "../components";

const SingleItems = () => {
    return (
        <>
        <Container> 
            <Row className="mt-5">
                <Col>
                     <Items />
                </Col>
                <Col>
                <div className="mt-4">
                    <p className="description text-start">
                        Описание игрового предмета его преимущества и условия аренды
                    </p>
                    <Form className="text-start" onSubmit="">
    
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Кол-во дней</Form.Label>
                            <Form.Control type="text" label="day" placeholder="До 365" value="" onChange="" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Кол-во токенов</Form.Label>
                            <Form.Control type="text" label="Quantity" placeholder="1"/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Комментарий</Form.Label>
                            <Form.Control type="text" label="adress" placeholder="Без перепродаж"  />
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
    )
}

export default SingleItems