import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { Col, Container, Row } from "react-bootstrap"
import { ethers } from "ethers";
import { UserLink } from "../components";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");

  return (
    <div>
        <h3 className="m-5 text-start">Игроки предоставляющие свой шмот в аренду</h3>
        <Container>
          <Row>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>

            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            <Col md="2" className="mt-4"> 
               <UserLink />
            </Col>
            
          </Row>
        </Container>
    </div>
  );
}

export default Home;
