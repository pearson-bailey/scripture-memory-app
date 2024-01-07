import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useViewport } from "../hooks";
import { Review } from "../types";
import Card from "./Card";
import "../styles/styles.scss";

interface SlickSliderProps {
  cards: Array<Review>;
  className: string;
}

const SlickSlider: React.FC<SlickSliderProps> = ({ cards, className }) => {
  const viewport = useViewport();
  const slidesToShow = viewport.is.lt("md") ? 1 : viewport.is.lt("lg") ? 2 : 3;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    className,
  };

  return (
    <Slider {...settings}>
      {cards.map((card, i) => (
        <Card card={card} key={i}></Card>
      ))}
    </Slider>
  );
};

export default SlickSlider;
