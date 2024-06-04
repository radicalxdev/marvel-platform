// frontend/components/OutputHistoryTable/OutputHistoryTable.jsx
import React, { useEffect, useState } from 'react';

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
  useMediaQuery,
} from '@mui/material';

import { auth } from 'firebase-admin';

import { functions } from './firebase';
import useStyles from './styles';

const OutputHistoryTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      const userID = user.uid;
      const getHist = functions.httpsCallable('getHist');
      try {
        const result = await getHist({ uid: userID });
        setData(result.data.data); // Assuming result.data has the structure { status: 'success', data: [...] }
      } catch (error) {
        throw new Error(error);
      }
    };

    fetchData();
  }, []);

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  return (
    <Grid container spacing={2} className={classes.container}>
      <Grid
        item
        xs={12}
        sm={isMobile ? 6 : 12}
        md={4}
        style={{ display: 'flex', flexWrap: 'wrap' }}
      >
        <TextField
          variant="outlined"
          placeholder="Search outputs"
          onChange={handleSearchChange}
          className={classes.searchInput}
        />
      </Grid>
      <Grid item xs={12} sm={isMobile ? 6 : 12} md={4}>
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
              {filteredData.map((output) => (
                <TableRow key={output.id}>
                  <TableCell>{output.title}</TableCell>
                  <TableCell>{output.type}</TableCell>
                  <TableCell>{output.creationDate}</TableCell>
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
