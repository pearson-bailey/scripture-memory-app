import React, { FormEvent, useCallback, useState } from "react";
import { supabase } from "../supabaseClient";
import "../styles/Review.scss";

interface ReviewProps {
  title: string;
}

const Review: React.FC<ReviewProps> = ({ title }) => {
  const [reviewTitle, setReviewTitle] = useState("");
  const [reviewBody, setReviewBody] = useState("");
  const [reviewer, setReviewer] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      setLoading(true);
      const review = {
        title: reviewTitle,
        body: reviewBody,
        reviewer: reviewer,
      };

      const { error } = await supabase.from("reviews").insert(review);

      if (error) {
        alert(error.message);
      } else {
        setSuccess(true);
      }

      setLoading(false);
    },
    [reviewTitle, reviewBody, reviewer]
  );

  return (
    <div className={"Review container"}>
      {!success ? (
        <>
          <h1 className={"Review__header"}>{title}</h1>
          <form
            className={"Review__form container"}
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className={"Review__form__title row"}>
              <label className="col-2" htmlFor="title">
                Title:
              </label>
              <input
                className="col-10"
                type="text"
                id="title"
                name="title"
                onChange={(e) => setReviewTitle(e.target.value)}
                required
              />
            </div>
            <div className={"Review__form__body row"}>
              <label className="col-2" htmlFor="body">
                Review:
              </label>
              <textarea
                className="col-10"
                id="body"
                name="body"
                onChange={(e) => setReviewBody(e.target.value)}
                required
              />
            </div>
            <div className={"Review__form__reviewer row"}>
              <label className="col-2" htmlFor="reviewer">
                Name:
              </label>
              <input
                className="col-10"
                type="text"
                id="reviewer"
                name="reviewer"
                onChange={(e) => setReviewer(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                Submit
              </button>
            </div>
          </form>
        </>
      ) : (
        <h1>Thanks for leaving us a review!</h1>
      )}
    </div>
  );
};

export default Review;
