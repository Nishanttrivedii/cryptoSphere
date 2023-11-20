import React, { useState, useEffect } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../api/api";

const CarouselCaching = () => {
  const [trending, setTrending] = useState([]);

  const { currency } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      // Check if data is in local storage
      const storedData = localStorage.getItem("trendingCoins");

      if (storedData) {
        setTrending(JSON.parse(storedData));
      } else {
        const { data } = await axios.get(TrendingCoins(currency));

        // Update state with fetched data
        setTrending(data);

        // Store data in local storage
        localStorage.setItem("trendingCoins", JSON.stringify(data));
      }
    } catch (error) {
      if (error.response && error.response.status === 429) {
        console.log("Rate limit exceeded. Retrying after a delay...");
        // Retry after a delay (e.g., 5 seconds)
        setTimeout(() => fetchTrendingCoins(), 5000);
      } else {
        console.error("Error fetching trending coins:", error);
      }
    }
  };

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

  const items = trending.map((coin) => (
    <Link key={coin.id} to={`/coins/${coin.id}`}>
      <img
        src={coin.image}
        alt={coin.name}
        height="80"
        style={{ marginBottom: 10, marginTop: 10 }}
      />
    </Link>
  ));

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
        items={items}
      />
    </div>
  );
};

export default CarouselCaching;
