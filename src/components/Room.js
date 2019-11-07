import React from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import defaultImage from "../images/room-1.jpeg";

const Room = ({ room }) => {
  const { name, slug, images, price } = room;
  return (
    <article className='room'>
      <div className='img-container'>
        <img src={images[0] || defaultImage} alt='single room' />
        <div className='price-top'>
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className='btn-primary room-link'>
          Featured Room
        </Link>
      </div>
      <p className='room-info'>{name}</p>
    </article>
  );
};

Room.propTypes = {
  room: Proptypes.shape({
    name: Proptypes.string.isRequired,
    slug: Proptypes.string.isRequired,
    images: Proptypes.arrayOf(Proptypes.string).isRequired,
    price: Proptypes.number.isRequired
  })
};

export default Room;
