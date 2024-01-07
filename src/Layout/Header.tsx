import React, { FormEventHandler, MouseEventHandler } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCircleUser,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Session } from "@supabase/supabase-js";
import "../styles/Header.scss";

interface HeaderProps {
  session: Session | null;
  showSearchBar: MouseEventHandler | FormEventHandler;
  showSlideNav: MouseEventHandler;
  loading: boolean;
  username: string | null;
}

const Header: React.FC<HeaderProps> = ({
  session,
  showSearchBar,
  showSlideNav,
  loading,
  username,
}) => {
  return (
    <header>
      <div className="Header container">
        <div className="Header__Logo col-md-3">
          <Link to={"/"}>
            <img
              src={"/scripture-memory-logo192.png"}
              className={"Header__Logo__Image"}
            />
          </Link>
        </div>
        <h1 className="Header__Title col-md-auto">Scripture Memory</h1>
        <div className="Header__Links col-md-3">
          <a className={"Header__Links__Search"} onClick={showSearchBar}>
            <FontAwesomeIcon icon={faSearch} size={"2xl"}></FontAwesomeIcon>
          </a>
          <Link to={"/my-account"} className={"Header__Links__Account"}>
            <FontAwesomeIcon icon={faCircleUser} size={"2xl"}></FontAwesomeIcon>
            {session && !loading ? (
              <p className={"Header__Links__Account-text"}>Hi, {username}!</p>
            ) : null}
          </Link>
          <a className={"Header__Links__Nav"} onClick={showSlideNav}>
            <FontAwesomeIcon icon={faBars} size={"2xl"}></FontAwesomeIcon>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
