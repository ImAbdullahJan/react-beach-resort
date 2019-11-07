import React, { useContext } from "react";
import { RoomContext } from "../context";
import Loading from "./Loading";
import Room from "./Room";
import Rooms from "../pages/Rooms";
import Title from "./Title";

const FeaturedRooms = () => {
  const { featuredRooms, loading } = useContext(RoomContext);
  console.log(featuredRooms);

  let rooms = featuredRooms.map(room => <Room key={room.id} room={room} />);

  return (
    <section className='featured-rooms'>
      <Title title='featured rooms' />
      <div className='featured-rooms-center'>
        {loading ? <Loading /> : rooms}
      </div>
    </section>
  );
};

export default FeaturedRooms;
