import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Backdrop from "@mui/material/Backdrop";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import Autocomplete from "@mui/material/Autocomplete";
import {
  getRecruits, assignAgent
} from '../../../../http/recruitment/RecruitmentAPI';
import {
  getBops,
} from '../../../../http/bop/BopAPI';
import Swal from 'sweetalert2'
import Moment from 'moment';
import { useStyles } from "./Styles";
import { datePickerValueManager } from "@mui/x-date-pickers/DatePicker/shared";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const RecruitList: React.FC = () => {
  const classes = useStyles();

  const [openModal, setOpenModal] = React.useState(false);
  const [recruitID, setRecruitID] = React.useState(0);
  const [agent, setAgent] = React.useState("");

  const [value, setValue] = React.useState<string>('');
  const [inputValue, setInputValue] = React.useState('');

  const handleOpen = (id: number) => {
    setOpenModal(true)
    setRecruitID(id)
  };
  const handleClose = () => setOpenModal(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [rowsData, setRowsData] = React.useState([]);
  const [dropDownList, setDataDropdownList] = React.useState([]);

  const onClickFilter = async () => {
    await getRecruits(value).then((response: any) => {
      setRowsData(rowsFunction(response))
    })
  }

  const updateAgent = async () => {
    setOpenModal(false);
    let isConfirmed = false;
    Swal.fire({
      text: "Are you sure that you want to assign this applicant to this agent ?",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes',
      preConfirm: async () => {
        try {
          await assignAgent(recruitID, agent)
          await getRecruits(value).then((response: any) => {
            console.log(response)
            setRowsData(rowsFunction(response))
          })
        } catch (error) {
          Swal.showValidationMessage(`An error occurred: ${error}`);
        }
      }
    }).then((result) => {
      if (!result.isConfirmed) {
        setOpenModal(true);
      }
    })

  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  interface Column {
    id:
    | "name"
    | "dateRegistered"
    | "recruiter"
    | "branch"
    | "mobile"
    | "location"
    | "email"
    | "bop";
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "dateRegistered", label: "Date Registered", minWidth: 170 },
    {
      id: "recruiter",
      label: "Recruiter",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "branch",
      label: "Branch Name",
      format: (value: number) => value.toLocaleString("en-US"),
    },
    {
      id: "mobile",
      label: "Mobile",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "location",
      label: "Location",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "email",
      label: "Email",
      format: (value: number) => value.toFixed(2),
    },
    {
      id: "bop",
      label: "BOP",
      format: (value: number) => value.toFixed(2),
    },
  ];

  interface Data {
    id: number;
    name: string;
    dateRegistered: string;
    recruiter: string;
    branch: string;
    mobile: string;
    location: string;
    email: string;
    bop: string;
  }

  function createData(
    id: number,
    name: string,
    dateRegistered: string,
    recruiter: string,
    branch: string,
    mobile: string,
    location: string,
    email: string,
    bop: string
  ): Data {
    return {
      id,
      name,
      dateRegistered,
      recruiter,
      branch,
      mobile,
      location,
      email,
      bop,
    };
  }

  React.useEffect(() => {
    async function fetch() {
      await getRecruits(value).then((response: any) => {
        setRowsData(rowsFunction(response))
      })
      await getBops().then((response: any) => {
        setDataDropdownList(createBopDropdownData(response))
      })
    }
    fetch();
  }, []);

  const rowsFunction = (data: []) => {
    let newArray: any = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        newArray.push(createData(
          data[i]['id'],
          `${data[i]['first_name']} ${data[i]['middle_name']} ${data[i]['last_name']}`,
          Moment(data[i]['created_at']).format('d MMM YYYY hh:mm:ss A'),
          data[i]['recruiter'] === "" || data[i]['recruiter'] === null ? "N/A" : data[i]['recruiter'],
          data[i]['branch'],
          data[i]['mobile_number'],
          `${data[i]['province']}, ${data[i]['city']}`,
          data[i]['email'],
          data[i]['bop'],
        ))
      }
    }
    return newArray;
  }


  const createBopDropdownData = (data: []) => {
    let newArray: any = [];
    if (data.length > 0) {
      for (let i = 0; i < data.length; i++) {
        newArray.push(data[i]['name'])
      }
    }
    return newArray;
  }

  return (
    <>
      <Grid
        item
        xs={12}
        md={12}
        lg={12}
        component={Paper}
        elevation={2}
        margin={2}
        padding={2}
      >
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModal}
          onClose={handleClose}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModal}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Assign Agent
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ cursor: "pointer" }}
              >
                Description for assigning an agent.
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <FormControl margin="normal" fullWidth>
                  <Autocomplete
                      disablePortal
                      id="combo-box-demo"
                      inputValue={agent}
                      onInputChange={(event, newInputValue) => {
                        setAgent(newInputValue);
                      }}
                      options={[
                        "Agent 1",
                        "Agent 2",
                        "Agent 3",
                      ]}
                      renderInput={(params) => (
                        <TextField
                          className={classes.root}
                          {...params}
                          label="Agent"
                          variant="standard"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item md={3} paddingRight={1}>
                  <Button onClick={handleClose} fullWidth>
                    Back
                  </Button>
                </Grid>
                <Grid item md={3} paddingRight={1}>
                  <Button color="error" variant="outlined" onClick={handleClose} fullWidth>
                    DELETE
                  </Button>
                </Grid>
                <Grid item md={3}>
                  <Button variant="outlined" onClick={updateAgent} fullWidth>
                    Assign
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
        <Typography component="h1" variant="h5">
          Recruit List
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ cursor: "pointer" }}
        >
          This section provides a comprehensive view of all candidates who
          have applied for open positions within your organization.
        </Typography>
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
        <Grid spacing={2} container>
          <Grid item xs={12} md={3}>
            <FormControl margin="normal" fullWidth>
                <Autocomplete
                      disablePortal
                      id="bop"
                      options={dropDownList}
                      onChange={(event: any, newValue: string) => {
                        setValue(newValue);
                      }}
                      inputValue={inputValue}
                      onInputChange={(event, newInputValue) => {
                        setInputValue(newInputValue);
                      }}
                      value={value}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Filter by BOP"
                        />
                      )}
                    />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={2}>
            <FormControl fullWidth margin="normal">
              <Button
                style={{ height: '57px', width: '100%', }}
                size="large"
                variant="outlined"
                color="primary"
                fullWidth
                onClick={onClickFilter}
              >
                Filter List
              </Button>
            </FormControl>
          </Grid>
        </Grid>

        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id}>{column.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowsData
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      onClick={() => handleOpen(row.id)}
                      tabIndex={-1}
                      key={row.id}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rowsData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </>
  )
}

export default RecruitList;