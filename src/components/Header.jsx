
// import AppBar from '@mui/material/AppBar';
// import Toolbar from '@mui/material/Toolbar';
// import Container from '@mui/material/Container';
// import { Typography } from '@mui/material';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
// import styled from '@emotion/styled';
// import { useNavigate } from 'react-router-dom';
// import { CryptoState } from '../CryptoContext';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import { Crypto } from '../CryptoContext';
// import { useContext } from 'react';
// const Header = () => {

//   const {currency,setCurrency}=useContext(Crypto);
// const navigate=useNavigate();
// const handleLogoClick = () => {
//   console.log("Logo clicked");
//   navigate("/");
// };
// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });
//   const HeaderContainer = styled("div")({
 
//   flex:"1",
//   color:"#9c27b0",
//   fontFamily:"Montserrat",
//   fontWeight: "bold",
//   cursor:"pointer",
//   fontSize:"1.3rem"


//   });

//   return (
    
//      <>
//      <ThemeProvider theme={darkTheme}>
// <AppBar position="static" color="transparent">
//   <Container>

//     <Toolbar>
//       <HeaderContainer>
//       <Typography onClick={handleLogoClick} sx={{
//                     fontWeight: "bold",
//                     cursor: "pointer",
//                     fontSize: "1.3rem",
//                     color: "#9c27b0",
//                     fontFamily: "Montserrat",
//                   }}>Crypto Sphere</Typography>
//       </HeaderContainer>
  
//       <Select variant="outlined" value="INR" onChange={(e)=>setCurrency(e.target.value)}>
     
//         <MenuItem value ={"USD"}>USD</MenuItem>
//         <MenuItem value ={"INR"}>INR</MenuItem>
//       </Select>

//     </Toolbar>
//   </Container>
// </AppBar>
// </ThemeProvider>
// </>

//   )
// }

// export default Header


import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles((theme) => ({
  title: {
    flex: 1,
    color: "gold",
    fontFamily: "Montserrat",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#fff",
    },
    type: "dark",
  },
});

function Header() {
  const classes = useStyles();
  const { currency, setCurrency } = CryptoState();

  const navigate = useNavigate();  // Use useNavigate instead of useHistory

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={() => navigate(`/`)}  // Use navigate instead of history.push
              variant="h6"
              className={classes.title}
            >
              Crypto Hunter
            </Typography>
            <Select
              variant="outlined"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={currency}
              style={{ width: 100, height: 40, marginLeft: 15 }}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default Header;
