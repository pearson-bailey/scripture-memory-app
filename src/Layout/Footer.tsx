import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

interface FooterProps {
  title: string;
}

const Footer: React.FC<FooterProps> = ({ title }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className={"container d-flex align-items-center"}>
        <i className={"col-4 text-start"}>
          <FontAwesomeIcon icon={faCopyright}></FontAwesomeIcon> {currentYear}{" "}
          Bailey Pearson. All rights reserved.
        </i>
        <div className={"col-4"}>This is the footer</div>
        <i className={"col-4 text-end"} />
      </div>
    </footer>
  );
};

export default Footer;
