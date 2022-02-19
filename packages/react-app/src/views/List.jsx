import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { CryptoCards, Card, Illustration } from 'web3uikit';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import axios from 'axios'
import { ethers } from "ethers";

const List = () => {
    return (
        <>
        <Container>
            <Row>
                <Col md="2">
                    <Card
                        description="Click to create a dApp"
                        title="dApp"
                        tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
                    >
                        <div>
                        <Illustration
                            height="180px"
                            logo="servers"
                            width="100%"
                        />
                        </div>
                    </Card>
                </Col>
                <Col md="2">
                    <Card
                        description="Click to create a dApp"
                        title="dApp"
                        tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
                    >
                        <div>
                        <Illustration
                            height="180px"
                            logo="servers"
                            width="100%"
                        />
                        </div>
                    </Card>
                </Col>
                <Col md="2">
                    <Card
                        description="Click to create a dApp"
                        title="dApp"
                        tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
                    >
                        <div>
                        <Illustration
                            height="180px"
                            logo="servers"
                            width="100%"
                        />
                        </div>
                    </Card>
                </Col>
                <Col md="2">
                    <Card
                        description="Click to create a dApp"
                        title="dApp"
                        tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
                    >
                        <div>
                        <Illustration
                            height="180px"
                            logo="servers"
                            width="100%"
                        />
                        </div>
                    </Card>
                </Col>
                <Col md="2">
                    <Card
                        description="Click to create a dApp"
                        title="dApp"
                        tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
                    >
                        <div>
                        <Illustration
                            height="180px"
                            logo="servers"
                            width="100%"
                        />
                        </div>
                    </Card>
                </Col>
                <Col md="2">
                    <Card
                        description="Click to create a dApp"
                        title="dApp"
                        tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
                    >
                        <div>
                        <Illustration
                            height="180px"
                            logo="servers"
                            width="100%"
                        />
                        </div>
                    </Card>
                </Col>
                <Col md="2">
                    <Card
                        description="Click to create a dApp"
                        title="dApp"
                        tooltipText="Lorem Ipsum Dole met sai souni lokomit anici trenicid"
                    >
                        <div>
                        <Illustration
                            height="180px"
                            logo="servers"
                            width="100%"
                        />
                        </div>
                    </Card>
                </Col>
                
            </Row>
        </Container>
        </>
    )
}

export default List