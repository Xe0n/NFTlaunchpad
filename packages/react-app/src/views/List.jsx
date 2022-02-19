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
                <Col md="2" className="mt-1">
                    <Link to="#CreatorPage">
                        <Card
                            description="@AuthorName"
                            title="NewArt_1"
                            isDisabled="true"
                        >
                            <div>
                            <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col md="2" className="mt-1">
                    <Link to="#CreatorPage">
                        <Card
                            description="@AuthorName"
                            title="NewArt_1"
                            isDisabled="true"
                        >
                            <div>
                            <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col md="2" className="mt-1">
                    <Link to="#CreatorPage">
                        <Card
                            description="@AuthorName"
                            title="NewArt_1"
                            isDisabled="true"
                        >
                            <div>
                            <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col md="2" className="mt-1">
                    <Link to="#CreatorPage">
                        <Card
                            description="@AuthorName"
                            title="NewArt_1"
                            isDisabled="true"
                        >
                            <div>
                            <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col md="2" className="mt-1">
                    <Link to="#CreatorPage">
                        <Card
                            description="@AuthorName"
                            title="NewArt_1"
                            isDisabled="true"
                        >
                            <div>
                            <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col md="2" className="mt-1">
                    <Link to="#CreatorPage">
                        <Card
                            description="@AuthorName"
                            title="NewArt_1"
                            isDisabled="true"
                        >
                            <div>
                            <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                            </div>
                        </Card>
                    </Link>
                </Col>
                <Col md="2" className="mt-3">
                    <Link to="#CreatorPage">
                        <Card
                            description="@AuthorName"
                            title="NewArt_1"
                            isDisabled="true"
                        >
                            <div>
                            <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                            </div>
                        </Card>
                    </Link>
                </Col>
                
            </Row>
        </Container>
        </>
    )
}

export default List