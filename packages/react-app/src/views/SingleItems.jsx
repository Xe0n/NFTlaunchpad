import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { CryptoCards, Card, Illustration, Avatar, Button } from 'web3uikit';
import { Row, Col, Container, Form } from 'react-bootstrap';
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
                    <Button
                        id="test-button-primary"
                        onClick={function noRefCheck(){}}
                        text="Взять в аренду"
                        theme="primary"
                        type="button"
                        />
                </div>
                </Col>
            </Row>
        </Container>
            
        </>
    )
}

export default SingleItems