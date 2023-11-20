import axios from "axios";
import React from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../api/api";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const { currency } = CryptoState();
  const fetchTrendingCoins = async () => {
    try {
      const currentTime = new Date().getTime();
      const timeSinceLastRequest = currentTime - lastRequestTime;

      // If time since last request is less than 20 milliseconds (to stay below 50 requests per second)
      if (timeSinceLastRequest < 20) {
        // Delay the next request to adhere to the rate limit
        await new Promise(resolve => setTimeout(resolve, 20 - timeSinceLastRequest));
      }

      const { data } = await axios.get(TrendingCoins(currency));
      setTrending(data);
      setLastRequestTime(new Date().getTime());
    } catch (error) {
     console.log("error");
    }
  };
 


  

  console.log(trending);
  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  const items=trending.map((coin)=>{
    return(
      <Link to={`/coins/${coin.id}`}>
     <img src={coin.image} alt={coin.name} height="80" style={{marginBottom:10,marginTop:20}} />
      </Link>
    )
  })
  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        responsive={responsive}
        autoPlay
        disableButtonsControls
        items={items}
      />
    </div>
  );
};

export default Carousel;
