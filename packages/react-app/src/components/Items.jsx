import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'web3uikit';

const Items = () => {
    return (
        <>
                <Link to="#items" className="cardItems">
                    <Card
                        description="@AuthorName"
                        title="NewArt_1"
                        isDisabled="true"
                    >
                        <div>
                        <img height="180px" max-width="100%" src="https://public.nftstatic.com/static/nft/zipped/ebe8c26025964357a6ed77bcf751e67a_zipped.png" />
                        </div>
                        <p><span className="buySpan">Ценность</span> 1ETH</p>
                        <p><span className="rentSpan">Аренда</span> 0.8ETH</p>
                    </Card>
                </Link>
        </>
    )
}

export default Items