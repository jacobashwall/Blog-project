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
import { Button, Checkbox, Grid, Skeleton, Tooltip } from '@mui/material';
import ReadMoreIcon from '@mui/icons-material/ReadMore';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import LoginDialog from './LoginDialog';
import { createTheme } from '@mui/material/styles';

function SearchPage() {
  const { username, setUsername } = useContext(UsernameContext)
  let { tag } = useParams();
  const url = SERVER_URL;
  const [searchedBlogs, setSearchedBlogs] = useState()
  const [readLaterBlogs, setReadLaterBlogs] = useState()
  const [loginOpen, setLoginOpen] = useState(false);
  const navigate = useNavigate()


  useEffect(() => {
    getSearchedBlogs();
  }, [tag, username])

  const readLater = (blogId) => {
    console.log(blogId)
    let isChecked = (!readLaterBlogs.includes(blogId))
    console.log(isChecked)
    axios.post(`${url}/add-read-later-by-username`,
      { blogId: blogId, username: username, isChecked: isChecked })
      .then((response) => {
        console.log(response)
        getReadLaterBlogs()
      })
  }

  const getSearchedBlogs = () => {
    axios.post(`${url}/get-blogs-by-tag`, { tag: tag })
      .then((response) => {
        console.log(response.data);
        setSearchedBlogs(response.data);
        getReadLaterBlogs();
      })
      .catch((error) => {
        console.error(`ERROR: ${error}`);
      });
  }

  const getReadLaterBlogs = () => {
    if (username) {
      axios.post(`${url}/get-read-later-by-username`, { username: username })
        .then((response) => {
          console.log(response.data);
          setReadLaterBlogs(response.data);
        })
        .catch((error) => {
          console.error(`ERROR: ${error}`);
        });
    }
  }

  const lowercase = createTheme({
    typography: {
      button: {
        textTransform: 'none'
      }
    }
  });


  function Row(props) {
    const [open, setOpen] = useState(false);
    let blogeDate = new Date(props.blog.date)
    return (
      <React.Fragment>
        <TableRow hover key={props.blog._id}>
          <TableCell sx={{ width: 70 }} >
            <Tooltip title="Description">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Tooltip>
          </TableCell>
          <TableCell sx={{ width: 200 }}><Typography>{props.blog.header}</Typography></TableCell>
          <TableCell align='center' sx={{ width: 100 }}>
            <Tooltip title={"Search all blogs by " + props.blog.author}>
              <Button theme={lowercase} onClick={() => { navigate(`../${username}/Search/${props.blog.author}`) }}>{props.blog.author}</Button>
            </Tooltip>
          </TableCell>
          <TableCell align='center' sx={{ width: 100 }}><Typography>{blogeDate.getDay() + "/" + blogeDate.getMonth() + "/" + blogeDate.getFullYear()}</Typography></TableCell>
          <TableCell sx={{ width: 300 }}>
            {props.blog.tags.map((tag, key) => {
              if (key != 0)
                return (
                  <Tooltip key={key} title={"Search all blogs tagged as " + tag}>
                    <Button onClick={() => { navigate(`../${username}/Search/${tag}`) }} key={key} endIcon={<LocalOfferIcon />}>{tag}</Button>
                  </Tooltip>
                )
            }
            )}
          </TableCell>
          <TableCell sx={{ width: 70 }}>
            <Tooltip title="Read later">
              {
                username ?
                  <Checkbox
                    checked={readLaterBlogs ? (readLaterBlogs.includes(props.blog._id) ? true : false) : false}
                    disabled={readLaterBlogs ? false : true}
                    icon={<BookmarkBorderOutlinedIcon />}
                    checkedIcon={<BookmarkOutlinedIcon />}
                    onClick={() => { readLater(props.blog._id) }}>
                  </Checkbox>
                  :
                  <Checkbox
                    icon={<BookmarkBorderOutlinedIcon />}
                    onClick={(e) => { e.preventDefault(); setLoginOpen(true) }}>
                  </Checkbox>
              }
            </Tooltip>
          </TableCell>
          <TableCell sx={{ width: 70 }}>
            <Tooltip title="Enter">
              <IconButton
                color="secondary"
                size="small"
                onClick={() => navigate(`../${username}/${props.blog._id}/View`)}>
                <ReadMoreIcon />
              </IconButton>
            </Tooltip>
          </TableCell>
        </TableRow>


        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
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
      <LoginDialog loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
      <Typography>{"Search results for " + tag}</Typography>
      <div className="searchResults">
        {
          searchedBlogs ?
            <Paper sx={{ width: '100%' }} elevation={10}>
              <TableContainer sx={{ maxHeight: 500, minHeight: 500 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ width: 70 }}></TableCell>
                      <TableCell align='center' sx={{ width: 200 }}><Typography>Title</Typography></TableCell>
                      <TableCell align='center' sx={{ width: 100 }} ><Typography>Author</Typography></TableCell>
                      <TableCell align='center' sx={{ width: 100 }} ><Typography>Date</Typography></TableCell>
                      <TableCell align='center' sx={{ width: 300 }} ><Typography>Tags</Typography></TableCell>
                      <TableCell sx={{ width: 70 }}></TableCell>
                      <TableCell sx={{ width: 70 }}></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {searchedBlogs
                      .map((blog, key) => {
                        return (
                          <Row blog={blog} key={key} />
                        )
                      })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
            :
            <Grid container spacing={0} direction='column'>
              <Grid item >
                <Skeleton sx={{ height: '60px', width: 600 }} />
              </Grid>
              <Grid item>
                <Skeleton sx={{ height: '60px', width: 600 }} />
              </Grid>
              <Grid item >
                <Skeleton sx={{ height: '60px', width: 600 }} />
              </Grid>
              <Grid item >
                <Skeleton sx={{ height: '60px', width: 600 }} />
              </Grid>
              <Grid item >
                <Skeleton sx={{ height: '60px', width: 600 }} />
              </Grid>
            </Grid>
        }
      </div>
    </div>
  )
}

export default SearchPage