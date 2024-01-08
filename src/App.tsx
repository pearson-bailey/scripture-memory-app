import React, { useCallback, useEffect, useState } from "react";
import {
  Navigate,
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import "./styles/App.scss";
import { supabase } from "./supabaseClient";
import { Session } from "@supabase/supabase-js";
import { Footer, Header } from "./Layout";
import { Account, Dashboard, Home, Login, Review, Search } from "./Common";
import { Nav, SearchBar } from "./UI";

const App = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [showNav, setShowNav] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      if (session != null) {
        setLoading(true);
        const { user } = session;

        const { data, error } = await supabase
          .from("profiles")
          .select(`username`)
          .eq("id", user.id)
          .single();

        if (!ignore) {
          if (error) {
            console.warn(error);
          } else if (data) {
            let name = data.username;
            const spaceIdx = name.indexOf(" ");
            if (spaceIdx !== -1) {
              name = name.substring(0, spaceIdx);
            }

            setUsername(name);
          }
        }

        setLoading(false);
      } else {
        return;
      }
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [session]);

  const showSlideNav = useCallback(() => {
    setShowNav((prev) => !prev);
  }, []);

  const showSearchBar = useCallback(() => {
    setShowSearch((prev) => !prev);
  }, []);

  return (
    <Router>
      <div className="App__wrapper">
        <Header
          session={session}
          showSlideNav={showSlideNav}
          showSearchBar={showSearchBar}
          loading={loading}
          username={username}
        ></Header>
        {showSearch ? <SearchBar showSearchBar={showSearchBar} /> : null}
        {showNav ? (
          <Nav
            session={session}
            showSlideNav={showSlideNav}
            loading={loading}
            username={username}
          />
        ) : null}
        <main>
          <Routes>
            <Route
              path="/my-account"
              element={!session ? <Login /> : <Account session={session} />}
            />
            <Route
              path="/"
              element={<Home title={"Home Page"} session={session} />}
            />
            <Route path="/home" element={<Navigate replace to="/" />} />
            <Route
              path="/review"
              element={<Review title={"Leave a Review!"} />}
            />
            <Route path="/search/:version?/:reference?" element={<Search />} />
            <Route
              path="/dashboard"
              element={<Dashboard session={session} />}
            />
          </Routes>
        </main>
        <Footer title={"Footer"} />
      </div>
    </Router>
  );
};

export default App;
