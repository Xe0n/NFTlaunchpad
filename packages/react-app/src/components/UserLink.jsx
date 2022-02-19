import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'web3uikit';

const UserLink = () => {
    return (
        <>
                <Link to="#CreatorPage" className="cardItems">
                    <Card
                        description="@AuthorName"
                        title="Game Name"
                        isDisabled="true"
                    >
                        <div>
                        <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                        </div>
                        <p><span className="buySpan">От</span> 0.01ETH</p>
                        <p><span className="rentSpan">До</span> 2.8ETH</p>
                    </Card>
                </Link>
        </>
    )
}

export default UserLink