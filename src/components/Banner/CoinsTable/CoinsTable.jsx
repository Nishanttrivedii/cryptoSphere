import { CoinList } from "../../../api/api";

import { StyledTableCell } from "./Table";
import { CryptoState } from "../../../CryptoContext";
import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import {
  Container,
  TextField,
  createTheme,
  ThemeProvider,
  Typography,
  TableContainer,
  LinearProgress,
  TableHead,
  Table,
  TableRow,
  TableBody,
} from "@material-ui/core";

import { useState, useEffect } from "react";
import LinearBuffer from "./LinearBuffer";
import CustomizedTables from "./Table";
import axios from "axios";

import { newData } from "../../../newDummyData";

export const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(Coin, Price, TwentyFourHour, Market_Cap) {
  return { Coin, Price, TwentyFourHour, Market_Cap };
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const [rateLimitExceeded, setRateLimitExceeded] = useState(false);
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const { currency, symbol } = CryptoState();

  const handleSearch = () => {
    if (!search) {
      return coins; // Show all data when search is empty
    }
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };

  const newHandleSearch = () => {
    if (!search) {
      return sortedData; // Show all data when search is empty
    }
    return sortedData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search) ||
        coin.symbol.toLowerCase().includes(search)
    );
  };
  const fetchCoins = async () => {
    setLoading(true);

    const { data } = await axios.get(CoinList(currency));

    console.log(data);
    setCoins(data);
    setLoading(false);
  };

  useEffect(() => {
    const sortedCoins = [...coins].sort((a, b) => a.market_cap_rank - b.MarketCap_Rank);
    
    setCoins(sortedCoins);
    fetchCoins();
  }, [currency]);

  const sortedData=[...newData].sort((a, b) => a.market_cap_rank - b.MarketCap_Rank);
  return (
    <ThemeProvider theme={darkTheme}>
      <Container
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "50vh",
          background: "#212122",
          position: "relative",
          zIndex: 1,
          marginTop: 150,
        }}
      >
        <Typography
          variant="h4"
          style={{
            color: "#b4cba3",
            textTransform: "capitalize",
            fontFamily: "Montserrat",
            marginTop: 20,
          }}
        >
          CryptoCurrency Prices by Market Cap
        </Typography>

        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{
            marginBottom: 20,
            marginTop: 40,
            width: "100%",
            color: "white",
            textDecorationColor: "white",
          }}
          onChange={(e) => setSearch(e.target.value)}
        />

        <TableContainer>
          {loading ? (
            <>
              <Typography style={{ marginBottom: 20 }}>
                Please wait the limit for the data to be fetched has been
                reached This is a view for the table,for how the table should
                look like..
              </Typography>
              <LinearBuffer />
              <Table
                sx={{
                  minWidth: 700,
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                }}
                aria-label="customized table"
              >
                <TableHead style={{ backgroundColor: "#155b45c4" }}>
                  <TableRow>
                    <StyledTableCell>Coin</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">24h Change</StyledTableCell>
                    <StyledTableCell align="right">Market Cap</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {newHandleSearch().map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginRight: 10, borderRadius: "50%" }}
                          />
                          <div>
                            <div style={{ fontWeight: "bold" }}>{row.name}</div>
                            <div style={{ color: "#555" }}>{row.symbol}</div>
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.current_price}
                        {symbol}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{
                          color: row.price_change_24h >= 0 ? "green" : "red",
                        }}
                      >
                        {row.price_change_24h.toFixed(2)}%
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.market_cap}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          ) : (
            <>
              {console.log("api data ready to be displayed")}
              <Table
                sx={{
                  minWidth: 700,
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                }}
                aria-label="customized table"
              >
                <TableHead style={{ backgroundColor: "#155b45c4" }}>
                  <TableRow>
                    <StyledTableCell>Coin</StyledTableCell>
                    <StyledTableCell align="right">Price</StyledTableCell>
                    <StyledTableCell align="right">24h Change</StyledTableCell>
                    <StyledTableCell align="right">Market Cap</StyledTableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {handleSearch().map((row) => (
                    <StyledTableRow key={row.name}>
                      <StyledTableCell component="th" scope="row">
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img
                            src={row.image}
                            alt={row.name}
                            height="50"
                            style={{ marginRight: 10, borderRadius: "50%" }}
                          />
                          <div>
                            <div style={{ fontWeight: "bold" }}>{row.name}</div>
                            <div style={{ color: "#555" }}>{row.symbol}</div>
                          </div>
                        </div>
                      </StyledTableCell>
                      <StyledTableCell align="right">
                      {row.current_price}
                        {symbol}
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{
                          color: row.price_change_24h >= 0 ? "green" : "red",
                        }}
                      >
                        {row.price_change_24h.toFixed(2)}%
                      </StyledTableCell>
                      <StyledTableCell align="right">
                        {row.market_cap}
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
