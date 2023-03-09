import * as React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { CSVLink } from "react-csv";
import {
    getAssignedRecruits,
} from "../../../../http/recruitment/RecruitmentAPI";
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Moment from 'moment';
import { useStyles } from "./Styles";

const Reports: React.FC = () => {
    const [fromDate, setFromDate] = React.useState<Dayjs | null>(dayjs());
    const [toDate, setToDate] = React.useState<Dayjs | null>(dayjs().add(30, 'day'));
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

    const onClickFilter = async () => {
        await getAssignedRecruits(fromDate, toDate).then((response: any) => {
            setRowsData(rowsFunction(response))
        })
    }

    const [rowsData, setRowsData] = React.useState([]);

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
            await getAssignedRecruits(fromDate, toDate).then((response: any) => {
                setRowsData(rowsFunction(response))
            })
        }
        fetch();
    }, []);

    const rowsFunction = (data: []) => {
        let newArray: any = [];
        if (data.length > 0) {
            for (let i = 0; i < data.length; i++) {
                console.log(i);
                newArray.push(
                    createData(
                        data[i]["id"],
                        `${data[i]["first_name"]} ${data[i]["middle_name"]} ${data[i]["last_name"]}`,
                        data[i]["created_at"],
                        data[i]["recruiter"] === "" || data[i]["recruiter"] === null
                            ? "N/A"
                            : data[i]["recruiter"],
                            data[i]["branch"] === "" || data[i]["branch"] === null
                            ? "N/A"
                            : data[i]["branch"],
                        data[i]["mobile_number"],
                        `${data[i]["province"]}, ${data[i]["city"]}`,
                        data[i]["email"],
                        data[i]["bop"] === "" || data[i]["bop"] === null
                        ? "N/A"
                        : data[i]["bop"],
                    )
                );
            }
        }
        return newArray;
    };

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
                <Typography component="h1" variant="h5">
                    Reports
                </Typography>
                <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ cursor: "pointer" }}
                >
                    This section provides a comprehensive view of all candidates who have
                    applied for open positions within your organization.
                </Typography>
                <Divider style={{ marginTop: 15, marginBottom: 15 }} />
                <TableContainer>
                    <Grid container spacing={2} top={5}>
                        <Grid item md={4}>
                            <FormControl margin="normal" fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="From"
                                        value={fromDate}
                                        onChange={(newValue) => {
                                            setFromDate(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item md={4}>
                            <FormControl margin="normal" fullWidth>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        renderInput={(props) => <TextField {...props} />}
                                        label="To"
                                        value={toDate}
                                        onChange={(newValue) => {
                                            setToDate(newValue);
                                        }}
                                    />
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl margin="normal" fullWidth>
                                <Button onClick={onClickFilter} variant="outlined" style={{ height: '58px', width: '100%', }} color="warning">
                                    Filter List
                                </Button>
                            </FormControl>
                        </Grid>
                        <Grid item md={2}>
                            <FormControl margin="normal" fullWidth>
                                <CSVLink
                                    data={rowsData}
                                    style={{ textDecoration: "none" }}
                                    filename={"myTable.csv"}
                                >
                                    <Button variant="outlined" style={{ height: '58px', width: '100%', }} color="warning">
                                        Download CSV
                                    </Button>
                                </CSVLink>
                            </FormControl>
                        </Grid>
                    </Grid>
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
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
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
            </Grid >
        </>
    );
};

export default Reports;
