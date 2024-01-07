import React, { useEffect, useState } from "react";
import "../styles/Home.scss";
import { Slider } from "../UI";
import { supabase } from "../supabaseClient";
import { Review } from "../types";
import { Session } from "@supabase/supabase-js";

interface HomeProps {
  title: string;
  session: Session | null;
}

const Home: React.FC<HomeProps> = ({ title, session }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  useEffect(() => {
    async function getReviews() {
      if (session != null) {
        const { data, error } = await supabase
          .from("reviews")
          .select("title, body, reviewer");

        if (error) {
          console.warn(error);
        } else if (data && !reviews.length) {
          setReviews(data);
        }
      } else {
        return;
      }
    }

    getReviews();
  }, [session]);

  return (
    <div className="Home container">
      <div className="Home__main d-flex flex-column align-items-center">
        <h2>{title}</h2>
        <p>Welcome to the Scripture Memory app!</p>
      </div>
      <Slider cards={reviews} className={"Home__testimonials"}></Slider>
    </div>
  );
};

export default Home;
