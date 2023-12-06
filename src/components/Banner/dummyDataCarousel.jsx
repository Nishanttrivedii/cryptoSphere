import axios from "axios";
import React from "react";
import { CryptoState } from "../../CryptoContext";
import { TrendingCoins } from "../../api/api";
import { useState, useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import cryptox from "../../dummyData";

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const DummyDataCarousel = () => {
  const [trending, setTrending] = useState([]);
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const { currency, symbol } = CryptoState();

  const fetchTrendingCoins = async () => {
    try {
      const currentTime = new Date().getTime();
      const timeSinceLastRequest = currentTime - lastRequestTime;

      // If time since last request is less than 20 milliseconds (to stay below 50 requests per second)
      if (timeSinceLastRequest < 20) {
        // Delay the next request to adhere to the rate limit
        await new Promise((resolve) =>
          setTimeout(resolve, 20 - timeSinceLastRequest)
        );  const currentTime = new Date().getTime();
        const timeSinceLastRequest = currentTime - lastRequestTime;
  
        // If time since last request is less than 20 milliseconds (to stay below 50 requests per second)
        if (timeSinceLastRequest < 20) {
          // Delay the next request to adhere to the rate limit
          await new Promise((resolve) =>
            setTimeout(resolve, 20 - timeSinceLastRequest)
          );
        }
  
        const { data } = await axios.get(TrendingCoins(currency));
        console.log(data + "our data");
        setTrending(data);
        setLastRequestTime(new Date().getTime());
        setRateLimitExceeded(false); // Reset the rate limit flag
        console.log("API data fetched successfully");
      }

      const { data } = await axios.get(TrendingCoins(currency));
      console.log(data + "our data");
      setTrending(data);
      setLastRequestTime(new Date().getTime());
      setRateLimitExceeded(false); // Reset the rate limit flag
      console.log("API data fetched successfully");
    } catch (error) {
      setRateLimitExceeded(true);
      console.error("Error fetching API data:", error);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();
  }, [currency]);

  const items = rateLimitExceeded
    ? cryptox.map((coin) => {
        const profit = coin.price_change_percentage_24h >= 0;
        return (
          <Link key={coin.id} to={`/coins/${coin.id}`}>
          <img
            src={coin.image}
            alt={coin.name}
            height="80"
            style={{ marginBottom: 10, marginTop: 20 }}
          />
          <Typography style={{ color: "yellow", paddingTop: "1px" ,fontFamily: 'Montserrat'}}>
            <span>{coin?.symbol}</span>
            &nbsp;
            <span
              style={{
                color: profit > 0 ? "green" : "red",
                
              }}
            >
              {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
            </span>
            <div>
              {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </div>
          </Typography>
          &nbsp;
        </Link>
        );
      })
    : trending.map((coin) => {
        const profit = coin.price_change_percentage_24h >= 0;
        return (
          <Link key={coin.id} to={`/coins/${coin.id}`}>
            <img
              src={coin.image}
              alt={coin.name}
              height="80"
              style={{ marginBottom: 10, marginTop: 20 }}
            />
            <Typography style={{ color: "yellow", paddingTop: "1px",fontFamily: 'Montserrat'}}>
              <span>{coin?.symbol}</span>
              &nbsp;
              <span
                style={{
                  color: profit > 0 ? "green" : "red",
                 
                }}
              >
                {profit && "+"} {coin?.price_change_percentage_24h.toFixed(2)}%
              </span>
              <div>
                {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
              </div>
            </Typography>
            &nbsp;
          </Link>
        );
      });

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  return (
    <div
      style={{
        height: "50%",
        display: "flex",
        alignItems: "center",
        marginTop: 40,
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

export default DummyDataCarousel;
