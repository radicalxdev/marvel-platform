// frontend/components/OutputHistoryTable/OutputHistoryTable.jsx
import React, { useState } from 'react';

import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
} from '@mui/material';

import useStyles from './styles';

const OutputHistoryTable = ({ data }) => {
  const classes = useStyles();
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          placeholder="Search outputs"
          onChange={handleSearchChange}
          className={classes.searchInput}
        />
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel>Title</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Type</TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel>Creation Date</TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.creationDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default OutputHistoryTable;
