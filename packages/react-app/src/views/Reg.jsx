import React from "react";
import { Link } from "react-router-dom";
import { useContractReader } from "eth-hooks";
import { CryptoCards, Card, Illustration } from 'web3uikit';
import { Row, Col, Container } from 'react-bootstrap';

import { ethers } from "ethers";

import 'bootstrap/dist/css/bootstrap.min.css';

const Reg = () => {
	return (
		<>
			<Container>
				<Row>
					<Col>
						<h3 className="p-3">Добро пожаловать, выберите чем вы хотите заниматься на площадке</h3>
					</Col>
				</Row>
				<Row>
					<Col>
						<Link to="/creator">
							<Card
								description="Разместите ваши работы и скоро вас заметят"
								title="Я автор"
								tooltipText="Опытные брокеры готовы взять ваши работы и помочь вам начать дорогу в мире NFT"
							>
								<div>
									<Illustration
										height="180px"
										logo="servers"
										width="100%"
									/>
								</div>
							</Card>
						</Link>
					</Col>
					<Col>
						<Link to="/broker">
							<Card
								description="Мы гарантируем что работы автора уникальны, а ваши вложения защищены"
								title="Я брокер"
								tooltipText="SMART-контракт обеспечивает соблюдения условий договора обоими сторонами"
							>
								<div>
									<Illustration
										height="180px"
										logo="servers"
										width="100%"
									/>
								</div>
							</Card>
						</Link>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Reg