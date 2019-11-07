import React from "react";
import { FaCocktail, FaHiking, FaShuttleVan, FaBeer } from "react-icons/fa";
import Title from "./Title";

const services = [
  {
    icon: <FaCocktail />,
    title: "free cocktails",
    info:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet metus venenatis est elementum consequat."
  },
  {
    icon: <FaHiking />,
    title: "endless hiking",
    info:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet metus venenatis est elementum consequat."
  },
  {
    icon: <FaShuttleVan />,
    title: "free shuttle",
    info:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet metus venenatis est elementum consequat."
  },
  {
    icon: <FaBeer />,
    title: "strongest beer",
    info:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet metus venenatis est elementum consequat."
  }
];

const Services = () => {
  return (
    <div>
      <section className='services'>
        <Title title='Services' />
        <div className='services-center'>
          {services.map((item, i) => {
            return (
              <article key={i} className='service'>
                <span>{item.icon}</span>
                <h6>{item.title}</h6>
                <p>{item.info}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Services;
