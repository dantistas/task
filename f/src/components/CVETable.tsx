import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CVE_Item } from "../types";
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

interface Column {
  id: 'cve-id' | 'publishedDate' | 'severity' | 'description';
  label: string;
  minWidth?: number;
  align?: 'right';
}

// table head items 
const columns: Column[] = [
  { id: 'cve-id', label: 'CVE ID', minWidth: 120 },
  { id: 'publishedDate', label: 'PUBLISHED DATE', minWidth: 140 },
  { id: 'severity', label: 'SEVERITY', minWidth: 100 },
  { id: 'description', label: 'DESCRIPTION', minWidth: 140 },
];





const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});



interface Props {
  cveItemsToShow: CVE_Item[] | [];
  foundByCVEID: CVE_Item[] | null;
}


const CVETable: React.FC<Props> = (props: Props) => {
  const { cveItemsToShow , foundByCVEID } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {// if user used search bar to search CVE this will be displayed first instead of cveItems to show
              foundByCVEID && foundByCVEID.length <=10 ? foundByCVEID.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:CVE_Item) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.cve.CVE_data_meta.ID}>
                {columns.map((column) => {
                  // gets value from cve and assigns to value const
                  const value:string | null = column.id === "cve-id" ? row.cve.CVE_data_meta.ID : column.id === "publishedDate" ? row.publishedDate.split("T")[0] : column.id === "severity" ? row.impact.baseMetricV2?.severity || "NOT LISTED" : column.id === "description" ? row.cve.description.description_data[0].value : null 
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          }) : cveItemsToShow?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row:CVE_Item) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.cve.CVE_data_meta.ID}>
                {columns.map((column) => {
                  const value:string | null = column.id === "cve-id" ? row.cve.CVE_data_meta.ID : column.id === "publishedDate" ? row.publishedDate.split("T")[0] : column.id === "severity" ? row.impact.baseMetricV2?.severity || "NOT LISTED" : column.id === "description" ? row.cve.description.description_data[0].value : null
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {value}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })
          }
            { // if not match this will be rendered
              cveItemsToShow.length === 0 || foundByCVEID?.length === 0 ? <TableRow><TableCell>No CVE with this criteria</TableCell></TableRow> : null }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={foundByCVEID ? foundByCVEID.length : cveItemsToShow.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}


export default CVETable