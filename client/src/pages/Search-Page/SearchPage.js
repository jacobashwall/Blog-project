import React, { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UsernameContext } from '../../UsernameConetxt';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
function SearchPage() {
  const { username, setUsername } = useContext(UsernameContext)
  let { tag } = useParams();
  const url = SERVER_URL;
  const [searchedBlogs, setSearchedBlogs] = useState([])
  const navigate = useNavigate()


  useEffect(() => {
    getSearchedBlogs();
  }, [])

  const getSearchedBlogs = () => {
    axios.post(`${url}/get-blogs-by-tag`, { tag: tag })
      .then((response) => {
        console.log(response.data);
        setSearchedBlogs(response.data);
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
      });
  }
  function Row(props) {
    const [open, setOpen] = useState(false);
    return (
      <React.Fragment>
        <TableRow hover key={props.blog._id}>
          <TableCell  >
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}>
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell ><Typography>{props.blog.header}</Typography></TableCell>
          <TableCell ><Typography>{props.blog.author}</Typography></TableCell>
          <TableCell ><Typography>{props.blog.date}</Typography></TableCell>
          <TableCell ><Typography>{props.blog.tags}</Typography></TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  {props.blog.subheader}
                </Typography>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }
  return (
    <div>
      <Typography>{"Search results for " + tag}</Typography>
      <div className="searchResults">
        {
          searchedBlogs ?
            <Paper sx={{ width: '100%' }}>
              <TableContainer sx={{ maxHeight: 500, width: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell  >
                      </TableCell>
                      <TableCell><Typography>Title</Typography></TableCell>
                      <TableCell><Typography>Author</Typography></TableCell>
                      <TableCell><Typography>Date</Typography></TableCell>
                      <TableCell><Typography>Tags</Typography></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchedBlogs
                      .map((blog) => {
                        return (
                          <Row blog={blog} />
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            :
            <Typography>Searching...</Typography>
        }
      </div>
    </div>
  )
}

export default SearchPage