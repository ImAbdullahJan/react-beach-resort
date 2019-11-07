import React, { useState, useEffect } from "react";
// import items from "./data";
import client from "./Contentful";

export const RoomContext = React.createContext();

const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState([]);
  const [sortedRooms, setSortedRooms] = useState([]);
  const [featuredRooms, setFeaturedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("all");
  const [capacity, setCapacity] = useState(1);
  const [price, setPrice] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [minSize, setMinSize] = useState(0);
  const [maxSize, setMaxSize] = useState(0);
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        let response = await client.getEntries({
          content_type: "beachResortRoom",
          order: "sys.createdAt"
        });

        let rooms = formatData(response.items);
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));

        setRooms(rooms);
        setFeaturedRooms(featuredRooms);
        setSortedRooms(rooms);
        setLoading(false);
        setPrice(maxPrice);
        setMaxPrice(maxPrice);
        setMaxSize(maxSize);
      } catch (error) {
        console.log(error);
      }
    };

    getData();

    let formatData = items => {
      let tempItems = items.map(item => {
        let id = item.sys.id;
        let images = item.fields.images.map(image => {
          return image.fields.file.url;
        });
        let room = { ...item.fields, images, id };
        return room;
      });
      return tempItems;
    };

    // let rooms = formatData(items);
    // let featuredRooms = rooms.filter(room => room.featured === true);
    // let maxPrice = Math.max(...rooms.map(item => item.price));
    // let maxSize = Math.max(...rooms.map(item => item.size));

    // setRooms(rooms);
    // setFeaturedRooms(featuredRooms);
    // setSortedRooms(rooms);
    // setLoading(false);
    // setPrice(maxPrice);
    // setMaxPrice(maxPrice);
    // setMaxSize(maxSize);
  }, []);

  useEffect(() => {
    filterRooms();
  }, [rooms, type, capacity, price, minSize, maxSize, breakfast, pets]);

  const getRoom = slug => {
    let tempRoom = rooms.find(room => room.slug === slug);
    return tempRoom;
  };

  const handleChange = event => {
    let target = event.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = event.target.name;
    console.log(name, value, target.type);

    if (name === "type") {
      setType(value);
      console.log(type);
      // filterRooms();
    }

    if (name === "capacity") {
      value = parseInt(value);
      setCapacity(value);
      console.log(capacity);
      // filterRooms();
    }

    if (name === "price") {
      value = parseInt(value);
      setPrice(value);
      console.log(price);
    }

    if (name === "minSize") {
      value = parseInt(value);
      setMinSize(value);
      console.log(minSize);
    }

    if (name === "maxSize") {
      value = parseInt(value);
      setMaxSize(value);
      console.log(maxSize);
    }

    if (name === "breakfast") {
      setBreakfast(value);
      console.log(breakfast);
    }

    if (name === "pets") {
      setPets(value);
      console.log(pets);
    }
  };

  const filterRooms = () => {
    let filRooms = [...rooms];
    console.log(filRooms);

    if (type !== "all") {
      filRooms = filRooms.filter(room => {
        console.log(type);
        return room.type === type;
      });
    }
    if (capacity !== 1) {
      filRooms = filRooms.filter(room => {
        console.log(capacity);
        return room.capacity >= capacity;
      });
    }

    filRooms = filRooms.filter(room => room.price <= price);

    filRooms = filRooms.filter(
      room => room.size >= minSize && room.size <= maxSize
    );

    if (breakfast) {
      filRooms = filRooms.filter(room => room.breakfast === true);
    }

    if (pets) {
      filRooms = filRooms.filter(room => room.pets === true);
    }

    setSortedRooms(filRooms);
  };

  return (
    <RoomContext.Provider
      value={{
        rooms,
        featuredRooms,
        sortedRooms,
        loading,
        type,
        capacity,
        price,
        minPrice,
        maxPrice,
        minSize,
        maxSize,
        breakfast,
        pets,
        getRoom,
        handleChange,
        filterRooms
      }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export default RoomProvider;
