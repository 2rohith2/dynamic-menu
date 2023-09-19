import { useState } from "react";
import Books from "../../assets/books.jpg";
import Car from "../../assets/car.jpg";
import Flower from "../../assets/flower.jpg";
import Kitchen from "../../assets/kitchen.jpg";
import PurpleFlower from "../../assets/purple-flower.jpg";
import Sofa from "../../assets/sofa.jpg";
import Table from "../../assets/table.jpg";

import "./index.scss";

interface ImageDetails {
  label: string;
  url: string;
}
export default function CarouselComponent(): JSX.Element {
  const [current, setCurrent] = useState<number>(5);

  const images: ImageDetails[] = [
    {
      label: "Image 1",
      url: Books,
    },
    {
      label: "Image 2",
      url: Car,
    },
    {
      label: "Image 3",
      url: Flower,
    },
    {
      label: "Image 4",
      url: Kitchen,
    },
    {
      label: "Image 5",
      url: PurpleFlower,
    },
    {
      label: "Image 6",
      url: Sofa,
    },
    {
      label: "Image 7",
      url: Table,
    },
  ];

  function next(): void {
    if (current + 1 === images.length) {
      setCurrent(0);
      return;
    }
    setCurrent(current + 1);
  }

  function previous(): void {
    if (current - 1 === -1) {
      setCurrent(images.length - 1);
      return;
    }
    setCurrent(current - 1);
  }

  function getImage(): JSX.Element[] {
    const carousel = [];

    let a = current;
    for (let index = 0; index < 5; index++) {
      if (a === images.length) {
        a = 0;
      }
      carousel.push(
        <img
          key={index}
          className={`carousel carousel--image${index}`}
          src={images[a].url}
        />
      );
      a++;
    }

    return carousel;
  }
  return (
    <>
      <div className="carousel">{getImage()}</div>
      <br />
      <div className="buttons">
        <button onClick={previous}>&larr;</button>
        <button onClick={next}>&rarr;</button>
      </div>
    </>
  );
}
