import { useEffect } from "react";
import initializeVanta from "../VantaComponent";
import { Container } from "semantic-ui-react";
import { Typography } from "@material-ui/core";
import Carousel from "./Carousel";
import CarouselCaching from "./CarouselCaching";
import dummyDataCarousel from "./dummyDataCarousel";
import DummyDataCarousel from "./dummyDataCarousel";
import cryptox from "../../dummyData";
const Banner = () => {
  useEffect(() => {
    initializeVanta();
  }, []);

  return (
    <div id="vanta-container">
      <Container className="bannerContent" 
      style={{
        height:200,
        display:"flex",
        flexDirection:"column",
        paddingTop:5,
        justifyContent:"space-around"
      }}
      >
       
           <div className="tagline"
          style={{
            height: 400,
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            justifyContent: "center",
            
          }}
           >

           <Typography 
            variant="h2"
            style={{
              fontWeight: "bold",
              color:"#4ee5a9",
              marginBottom: 15,
              marginTop:30,
              fontFamily: "Montserrat",
              
            }}
          >
            Crypto Sphere
          </Typography>
          
         
         <Typography
            variant="subtitle2"
            style={{
              color: "#b4cba3",
              textTransform: "capitalize",
              fontFamily: "Montserrat",
              
            }}
          >
            Get all the Info regarding your favorite Crypto Currency
          </Typography>
         
       
           </div>
         <DummyDataCarousel/>
      </Container>
    </div>
  );
};

export default Banner;
