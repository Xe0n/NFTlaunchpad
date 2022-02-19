import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { CryptoCards, Card, Illustration, Avatar } from 'web3uikit';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { ethers } from "ethers";
import { Items } from "../components";

const CreatorPage = () => {
    return (
        <>
        <Container>
            <Row className="pt-3"> 
                <Col md="6"> 
                    <Row>
                        <Col md="3"><img src="https://yt3.ggpht.com/ytc/AKedOLQf5MBcFSDzo2FeZIXSqafCvdRMGjW2C-0j8RpD=s900-c-k-c0x00ffffff-no-rj" className="avatar-main" alt="" /></Col>
                        <Col md="9">
                            <h3 className="text-start">@antony213</h3>
                            <p className="description">Предоставляю в аренду айтемы из игр по выгодным условиям</p>
                        </Col>
                    </Row>

                </Col>
                <Col md="6"> 
                   
                </Col>
            </Row>
            <Row className="pt-3">
                <hr />
                <h3 className="text-start">Коллекция игрока</h3>
                <Items/>

            </Row>
         </Container>
        </>
    )
}
export default CreatorPage

