import React from "react";
import { Link } from "react-router-dom";
import { Card } from 'web3uikit';

const Items = (props) => {
    return (
        <>
                <Link to="#items" className="cardItems">
                    <Card
                        description="@AuthorName"
                        title="NewArt_1"
                        isDisabled="true"
                    >
                        <div>
                        <img height="180px" max-width="100%" src={props.image} />
                        </div>
                        <p><span className="rentSpan">Название</span> {props.name}</p>
                        <p><span className="buySpan">Количество</span> {props.quantity}</p>
                        <p><span className="buySpan"></span> {props.tokenAddress}</p>
                    </Card>
                </Link>
        </>
    )
}

export default Items
