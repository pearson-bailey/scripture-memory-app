import React from "react";
import { Review } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faComment } from "@fortawesome/free-solid-svg-icons";
import "../styles/Card.scss";

interface CardProps {
  card: Review;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <>
      <div className={"Card"}>
        <h3 className={"Card__Title"}>{card.title}</h3>
        <p className={"Card__Body"}>{card.body}</p>
        <i className={"Card__Reviewer"}>
          <FontAwesomeIcon
            icon={faCircleUser}
            className={"Card__Reviewer__Icon"}
          />{" "}
          {card.reviewer}
        </i>
      </div>
    </>
  );
};

export default Card;
