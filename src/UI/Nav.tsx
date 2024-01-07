import "../styles/Nav.scss";
import React, { MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { Session } from "@supabase/supabase-js";
import { Link } from "react-router-dom";

interface NavProps {
  session: Session | null;
  showSlideNav: MouseEventHandler;
  loading: boolean;
  username: string | null;
}

const Nav: React.FC<NavProps> = ({
  session,
  showSlideNav,
  loading,
  username,
}) => {
  return (
    <div className={"Nav"}>
      <div className={"Nav__header"}>
        <h2 className={"Nav__header__title"}>Slide Nav</h2>
        <a className={"Nav__header__close"} onClick={showSlideNav}>
          <FontAwesomeIcon icon={faXmark} size={"2xl"}></FontAwesomeIcon>
        </a>
      </div>
      <div className={"Nav__body"}>
        <div className={"Nav__body__greeting"}>
          {session && !loading ? (
            <h4>Greetings, {username}!</h4>
          ) : !loading ? (
            <Link to={"/my-account"}>Sign In</Link>
          ) : null}
        </div>
        <div className={"Nav__body__dashboard"}>
          <Link to={"/dashboard"}>My Dashboard</Link>
        </div>
      </div>
      <hr></hr>
      <div className={"Nav__footer"}>
        <div className={"Nav__footer__contact-us"}>
          <Link to={"/contact-us"}>Contact Us</Link>
        </div>
        <div className={"Nav__footer__review"}>
          <Link to={"/review"}>Leave a Review</Link>
        </div>
        <div className={"Nav__footer__feedback"}>
          <Link to={"/feedback"}>Feedback</Link>
        </div>
      </div>
    </div>
  );
};

export default Nav;
