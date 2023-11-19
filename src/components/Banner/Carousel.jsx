import axios from "axios";
import React from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../api/api";
import { useState,useEffect} from "react";

const Carousel = () => {
    const [trending,setTrending]=useState([]);

  const { currency } = CryptoState();
  const fetchTrendingCoins = async () => {
  const {data}=await axios.get(TrendingCoins(currency));
  setTrending(data);
  console.log(trending);
  };

  console.log(trending);
  useEffect(()=>
  {
    fetchTrendingCoins();
  },[currency]
  );
 
  
  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      Carousel
    </div>
  );
};

export default Carousel;
