import React from "react";
import { Verse } from "../types";
import "../styles/VerseCard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

interface VerseCardProps {
  card: Verse;
}

const VerseCard: React.FC<VerseCardProps> = ({ card }) => {
  return (
    <div className="VerseCard">
      <div className="VerseCard__body">
        <div className="VerseCard__body__text">{card.verse_text}</div>
        <div className="VerseCard__body__reference">
          {`${card.reference} (${card.version.toUpperCase()})`}
        </div>
      </div>
      <div className="VerseCard__footer">
        <button className="VerseCard__footer__practice">
          <FontAwesomeIcon icon={faPlay}></FontAwesomeIcon>Practice
        </button>
        <button className="VerseCard__footer__addSet">
          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>Add to Set
        </button>
        <button className="VerseCard__footer__delete">
          <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>Delete
        </button>
      </div>
    </div>
  );
};

export default VerseCard;
