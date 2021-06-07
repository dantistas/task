import React, {useState} from 'react';
import { CVE_Item } from "../types";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex', // sita nutrinti jeigu noresi
    },
    drawer: {
      width: 240,
      flexShrink: 0,
    },
    drawerPaper: {
      height: 'calc(100% - 64px)',
      top: 64,
      width:240,
      [theme.breakpoints.up('xs')]: {
        top: 56,
      },
      [theme.breakpoints.up('sm')]: {
        top: 64,
      }
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    buttons: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }),
);

interface Props {
  data:CVE_Item[] | undefined;
  cveItemsToShow:CVE_Item[] | undefined;
  setCveItemsToShow:any;
  drawerOpenState: boolean;
  dates:string[];
}

interface Severity {
  minor:boolean;
  major:boolean;
  critical: boolean
}

const DrawerComponent: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { data, cveItemsToShow, setCveItemsToShow, drawerOpenState, dates, } = props;

  const baseSeverityState = {
    minor: false,
    major: false,
    critical: false,
  };

  const [year, setYear] = useState<string | null>(null)
  const [severity, setSeverity] = useState<Severity>(baseSeverityState)

  //updates only values wich are checked in the checkbox
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSeverity({ ...severity, [event.target.name]: event.target.checked });
  }
  //resets state and updates cveItemsToshow on reset button click
  const resetState = () => {
    setSeverity(baseSeverityState)
    setYear(null)
    setCveItemsToShow(data)
  }

  let filteredData:CVE_Item[] | undefined ;

  const filterData = () => {
    //severity search criteria based on checkbox selection
    const minorSeverityCriteria = severity.minor === true ? "LOW" : null
    const majorSeverityCriteria = severity.major === true ? "MEDIUM" : null
    const criticalSeverityCriteria = severity.critical === true ? "HIGH" : null

    //filter based on year and sverity 
    if( year && ( minorSeverityCriteria || majorSeverityCriteria || criticalSeverityCriteria )){
      filteredData = data?.filter((cveItem)=>(cveItem.publishedDate.split("-")[0] === year && cveItem.impact.hasOwnProperty('baseMetricV2') && (cveItem.impact.baseMetricV2.severity === minorSeverityCriteria || cveItem.impact.baseMetricV2.severity ===  majorSeverityCriteria || cveItem.impact.baseMetricV2.severity === criticalSeverityCriteria ) ))
    //filter based on year only 
    } else if (year){
      filteredData = data?.filter((cveItem)=>(cveItem.publishedDate.split("-")[0] === year))
    //filter based on severity only 
    }else if((minorSeverityCriteria || majorSeverityCriteria || criticalSeverityCriteria) && !year ){
      filteredData = data?.filter((item) => (item.impact.hasOwnProperty('baseMetricV2') && (item.impact.baseMetricV2.severity === minorSeverityCriteria || item.impact.baseMetricV2.severity === majorSeverityCriteria || item.impact.baseMetricV2.severity === criticalSeverityCriteria)  ));
    }else{
      filteredData = data
    }
    //sets filtered data to the state cveItemsToShow 
    setCveItemsToShow(filteredData)  
  }

  

  return (
    <div>
      <Drawer
        anchor="left"
        open={drawerOpenState}
        className={classes.drawer}
        variant={!drawerOpenState ? "temporary" : "persistent"}
        transitionDuration={500}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerContainer}>
          <div>
            <List>
              <ListItem>
                <FormControl className={classes.formControl}>
                  <Typography>SELECT YEAR</Typography>
                  <Select
                    id="select"
                    value={year}
                    onChange={(event) => {
                      setYear(event.target.value as string);
                    }}
                  >
                    {dates.map((year, index) => (
                      <MenuItem value={year}>{year}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <FormControl className={classes.formControl}>
                  <Typography>SELECT SEVERITY</Typography>
                  <FormControlLabel
                    value="minor"
                    control={
                      <Checkbox
                        color="primary"
                        checked={severity.minor}
                        onChange={handleCheckboxChange}
                        name="minor"
                      />
                    }
                    label="Minor"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="major"
                    control={
                      <Checkbox
                        color="primary"
                        checked={severity.major}
                        onChange={handleCheckboxChange}
                        name="major"
                      />
                    }
                    label="Major"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="critical"
                    control={
                      <Checkbox
                        color="primary"
                        checked={severity.critical}
                        onChange={handleCheckboxChange}
                        name="critical"
                      />
                    }
                    label="Critical"
                    labelPlacement="end"
                  />
                </FormControl>
              </ListItem>
            </List>
            <Divider />
            <List>
              <ListItem>
                <div className={classes.buttons}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={resetState}
                  >
                    Reset
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="primary"
                    onClick={filterData}
                  >
                    Apply
                  </Button>
                </div>
              </ListItem>
            </List>
          </div>
        </div>
      </Drawer>
    </div>
  );
}


export default DrawerComponent