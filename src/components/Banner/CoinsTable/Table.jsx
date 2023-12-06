


import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CoinsTable from "./CoinsTable";

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

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

const handleSearch = (coins,search) => {
  return coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search) ||
      coin.symbol.toLowerCase().includes(search)
  );
};
const rows = [
  createData("Coin", 159, 6.0, 24, 4.0),
  createData("Price", 237, 9.0, 37, 4.3),
  createData("24h", 262, 16.0, 24, 6.0),
  createData("Market Cap", 305, 3.7, 67, 4.3),
];

export default function CustomizedTables({coins,search}) {
  {
    handleSearch(coins,search).map((row) => {
        const profit=row.price_change_percentage_24h > 0;
      return (
        <StyledTableRow key={row.name}>
          <StyledTableCell component="+th" scope="row">
            {row.name}
          </StyledTableCell>
          <StyledTableCell align="right"><img
              src={row.image}
              alt={row.name}
              height="80"
              style={{ marginBottom: 10, marginTop: 20 }}
            /></StyledTableCell>
      
        </StyledTableRow>
      );
    });
  }
}
