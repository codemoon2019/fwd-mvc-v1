import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
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
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
import AddIcon from '@mui/icons-material/Add';
import {
  createBop, getBops, 
} from '../../../../http/bop/BopAPI';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Moment from 'moment';

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

const BOP: React.FC = () => {
  const [date, setDate] = React.useState<Dayjs | null>(dayjs('2022-04-07'));
  const [name, setName] = React.useState("");
  const [venue, setVenue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [rowsData, setRowsData] = React.useState([]);
   
  const handleSubmitCreateForm = async () => {
    createBop({
      "name": name,
      "date": date,
      "venue": venue
    });
    await getBops().then((response: any) => {
      setRowsData(rowsFunction(response))
    })
    handleClose()
  }   

  interface Column {
    id:
    | "name"
    | "date"
    | "venue"
    label: string;
    minWidth?: number;
    align?: "right";
    format?: (value: number) => string;
  }

  const columns: readonly Column[] = [
    { id: "name", label: "Name" },
    { id: "date", label: "Date" },
    { id: "venue", label: "Venue" },
  ];

  interface Data {
    name: string;
    date: string;
    venue: string;
    id: string;
  }

  function createData(
    name: string,
    date: string,
    venue: string,
    id: string,
  ): Data {
    return {
      name,
      date,
      venue,
      id,
    };
  }

  React.useEffect(() => {
    async function fetch(){
      await getBops().then((response: any) => {
        setRowsData(rowsFunction(response))
      })
    }
    fetch();
  }, []);

  const rowsFunction = (data: []) => {
    let newArray: any = [];
    if(data.length > 0){
      for(let i = 0; i < data.length; i++){
        newArray.push(createData(
          data[i]['name'],
          Moment(data[i]['date']).format('d MMM YYYY hh:mm:ss A'),
          data[i]['venue'],
          data[i]['id']
        ))
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
                BOP Module
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ cursor: "pointer" }}
              >
                Description for this module
              </Typography>
              <Grid container spacing={2}>
                <Grid item md={12}>
                  <Grid item md={12}>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        id="outlined-basic"
                        label="Name"
                        variant="outlined"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item md={12}>
                    <FormControl fullWidth margin="normal">
                      <TextField
                        id="outlined-basic"
                        label="Venue"
                        variant="outlined"
                        value={venue}
                        onChange={(e) => {
                          setVenue(e.target.value);
                        }}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <FormControl margin="normal" fullWidth>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Date"
                        value={date}
                        onChange={(newValue) => {
                          setDate(newValue);
                        }}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Grid>
              </Grid>
              <Grid container justifyContent="flex-end">
                <Grid item md={3} paddingRight={1}>
                  <Button color="error" variant="outlined" fullWidth onClick={handleClose}>
                    Cancel
                  </Button>
                </Grid>
                <Grid item md={3}>
                  <Button variant="outlined" fullWidth onClick={handleSubmitCreateForm}>
                    Add
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Modal>
        <Typography component="h1" variant="h5">
          BOP List
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ cursor: "pointer" }}
        >
          Description for this module
        </Typography>
        <Divider style={{ marginTop: 15, marginBottom: 15 }} />
        <Grid container spacing={2} top={5} justifyContent="right">
          <Grid item md={2}>
            <FormControl fullWidth margin="normal">
              <Button
                style={{ height: '58px', width: '100%', }}
                size="large"
                variant="outlined"
                color="primary"
                onClick={handleOpen}
                fullWidth
              >
                <AddIcon /> Add new BOP
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
                      tabIndex={-1}
                      key={row['id']}
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

export default BOP;