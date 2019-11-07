import React, { useContext } from "react";
import RoomList from "./RoomList";
import RoomFilter from "./RoomFilter";
import Loading from "./Loading";
import { RoomContext } from "../context";

const RoomContainer = () => {
  const { loading, sortedRooms, rooms } = useContext(RoomContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <RoomFilter rooms={rooms} />
      <RoomList rooms={sortedRooms} />
    </div>
  );
};

export default RoomContainer;
