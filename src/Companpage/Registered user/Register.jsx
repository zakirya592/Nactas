import React, { useState, useEffect, useRef } from 'react';
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Sidebard from '../../Component/Sidebard/Sidebard';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import eye from "../../img/eye.png";
import deleteicon from "../../img/Delate.png"
// import "./Liststyle.css"
import axios from 'axios'
import { Avatar } from 'antd';

const drawerWidth = 220

function Register() {

    function createData(name, code, population, size) {
        const density = population / size;
        return { name, code, population, size, density };
    }

    const rows = [
        createData('India', 'IN', 1324171354, 3287263),
        createData('China', 'CN', 1403500365, 9596961),
        createData('Italy', 'IT', 60483973, 301340),
        createData('United States', 'US', 327167434, 9833520),
        createData('Canada', 'CA', 37602103, 9984670),
        createData('Australia', 'AU', 25475400, 7692024),
        createData('Germany', 'DE', 83019200, 357578),
        createData('Ireland', 'IE', 4857000, 70273),
        createData('Mexico', 'MX', 126577691, 1972550),
        createData('Japan', 'JP', 126317000, 377973),
        createData('France', 'FR', 67022000, 640679),
        createData('United Kingdom', 'GB', 67545757, 242495),
        createData('Russia', 'RU', 146793744, 17098246),
        createData('Nigeria', 'NG', 200962417, 923768),
        createData('Brazil', 'BR', 210147125, 8515767),
    ];
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const [open, setOpen] = React.useState(false)
    const anchorRef = React.useRef(null)

    // Main API fuction of the compount
    const [dataget, setdataget] = useState();
    const [filter, setFilter] = useState("");
    const [filterlastname, setfilterlastname] = useState("");
    const [length, setlength] = useState("");


    const [showInput, setShowInput] = useState(false);
    const [filterlastnameinput, setfilterlastnameinput] = useState(false);
    const [activeData, setActiveData] = useState();
    const apicall = () => {
        axios.get(`http://gs1ksa.org:3015/api/getMembersAll`)
            .then((res) => {
                setdataget(res.data.recordset);
                // console.log(res.data);
                setRows(res.data.recordset);
                // setlength(res.data.recordset.length);
                const dadad = res.data.recordset;
                const dataga = dadad.filter((item) => item.status === 'Active'); // Filter the data based on the 'status' property
                setActiveData(dataga)
                setlength(dataga.length);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    useEffect(() => {
        apicall();
    }, []);

    function handleIconClick() {
        setShowInput(!showInput);
    }
    const [rowss, setRows] = React.useState([])
  return (
    <>
          <div className=''>
              <Box sx={{ display: 'flex' }}>
                  <Sidebard />
                  <AppBar
                      className='fortrans'
                      position='fixed'
                      sx={{
                          width: { sm: `calc(100% - ${drawerWidth}px)` },
                          ml: { sm: `${drawerWidth}px` }
                      }}
                  ></AppBar>
                  <Box
                      className=''
                      sx={{
                          flexGrow: 1,
                          my: 5,
                          mx: 1,
                          width: { sm: `calc(100% - ${drawerWidth}px)` }
                      }}
                  >
                      <div className=" mt-5">
                          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                              <TableContainer sx={{ maxHeight: 350 }}>
                                  <Table stickyHeader aria-label="sticky table">
                                      <TableHead>

                                          <TableRow classname='fontfamilyRoboto contracttableheaderpadding'>
                                              <TableCell numeric className="fontfamilyRoboto contracttableheaderpadding" >First Name </TableCell>
                                              {/* <TableCell className="tablehad">ID</TableCell> */}
                                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">
                                                  last Name </TableCell>
                                              <TableCell className=" fontfamilyRoboto contracttableheaderpadding ">City</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Club Name</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">National president </TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Club secretry NO</TableCell>
                                              <TableCell className="fontfamilyRoboto contracttableheaderpadding ">Status</TableCell>
                                          </TableRow>

                                      </TableHead>

                                      {
                                          activeData && activeData.filter((person) =>
                                              person.first_name.toLowerCase().includes(filter.toLowerCase()) &&
                                              person.last_name.toLowerCase().includes(filterlastname.toLowerCase())

                                          ).map((itme, index) => {
                                              return (

                                                  <TableBody className="fortablebodypadding text-black fontfamilyInter">
                                                      {/* {rows.map(({ id, name, calories, fat, carbs, protein }) => ( */}
                                                      <TableRow
                                                          className="" key={index}>
                                                          <TableCell numeric className="fortablebodypadding text-blackcontract text-black fontfamilyInter ">
                                                              <Avatar src={<img src={itme.selfieIDImage} alt="UserImage" style={{ backgroundColor: '#505254', color: '#f56a00' }} />} ></Avatar> {itme.first_name}
                                                          </TableCell>
                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                              {itme.last_name}
                                                          </TableCell>

                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter "> {itme.city}</TableCell>
                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.club_name}</TableCell>

                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">
                                                              {itme.national_president}
                                                          </TableCell>
                                                          <TableCell className="fortablebodypadding text-black fontfamilyInter ">{itme.club_secretry_NO}</TableCell>
                                                          <TableCell numeric className="fortablebodypadding text-black fontfamilyInter ">
                                                              <div className="actionimag d-flex justify-content-around py-2 rounded w-100">
                                                                  <img
                                                                      className="cursor my-auto"
                                                                      height="17px"
                                                                      src={eye}
                                                                      onClick={() => {
                                                                          //   navigate(`/Hospitalview/${itme._id}`);
                                                                          //   sessionStorage.setItem("detailshosta", itme._id);
                                                                          // navigate("/Hospitalview");
                                                                      }}
                                                                  />
                                                                  <img className="cursor" src={deleteicon} />
                                                              </div>
                                                          </TableCell>
                                                      </TableRow>

                                                      {/* ))} */}
                                                  </TableBody>

                                              );
                                          })}

                                  </Table>
                              </TableContainer>
                              <TablePagination
                                  rowsPerPageOptions={[10, 25, 100]}
                                  component="div"
                                  count={length}
                                  rowsPerPage={rowsPerPage}
                                  page={page}
                                  onPageChange={handleChangePage}
                                  onRowsPerPageChange={handleChangeRowsPerPage}
                              />
                          </Paper>
                      </div>
                  </Box>
              </Box>
          </div >
    </>
  )
}

export default Register