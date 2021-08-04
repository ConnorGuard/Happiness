import '../../css/App.css';
import { useState, useEffect } from "react";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';


export function RankTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    setPage(0);
  }, [props.data]);

  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="left">Country</TableCell>
            <TableCell align="left">Happiness Score</TableCell>
            <TableCell align="left">Year</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.slice(page * rowsPerPage,page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.year}>
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell align="left">{row.country}</TableCell>
              <TableCell align="left">{row.score}</TableCell>
              <TableCell align="left">{row.year}</TableCell>
            </TableRow>
            
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="paper"
        count={props.data.length}
        page={page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5,10]}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}


export function FactorsTable(props) {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    props.setPage(newPage);
  };


  useEffect(() => {
    props.setPage(0);
  }, [props.data]);


  return (
    <TableContainer component={Paper} >
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Rank</TableCell>
            <TableCell align="left">Country</TableCell>
            <TableCell align="left">Happiness Score</TableCell>
            <TableCell align="left">Economy</TableCell>
            <TableCell align="left">Family</TableCell>
            <TableCell align="left">Health</TableCell>
            <TableCell align="left">Freedom</TableCell>
            <TableCell align="left">generosity</TableCell>
            <TableCell align="left">trust</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.slice(props.page * rowsPerPage,props.page * rowsPerPage + rowsPerPage).map((row) => (
            <TableRow key={row.rank}>
              <TableCell component="th" scope="row">
                {row.rank}
              </TableCell>
              <TableCell align="left">{row.country}</TableCell>
              <TableCell align="left">{row.score}</TableCell>
              <TableCell align="left">{row.economy}</TableCell>
              <TableCell align="left">{row.family}</TableCell>
              <TableCell align="left">{row.health}</TableCell>
              <TableCell align="left">{row.freedom}</TableCell>
              <TableCell align="left">{row.generosity}</TableCell>
              <TableCell align="left">{row.trust}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="paper"
        count={props.data.length}
        page={props.page}
        onChangePage={handleChangePage}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5]}
        maximumSelectionLength ={5}
      />
    </TableContainer>
  );
}
