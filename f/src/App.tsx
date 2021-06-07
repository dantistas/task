import React, { useEffect, useState } from 'react'
import './App.css';
import axios from 'axios'
//tpes of the data
import { Data, CVE_Item } from "./types";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

//compnents
import NavBar from './components/NavBar'
import DrawerComponent from './components/DrawerComponent'
import ChartAndTable from './components/ChartAndTable'



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }),
);


const App: React.FC = () => {
  const classes = useStyles();
  //data fetched from json stored in this state
  const [data, setData] = useState<Data | null>(null) // data or null arba as any
  //Unique dates are scrapped of the data and stored in this state
  const [dates, setDates] =useState<string[]>([])
  //search state
  const [foundByCVEID, setFoundByCVEID] = useState<CVE_Item[] | null>(null)

  // drawer open state
  const [drawerOpenState, setDrawerOpenState] = useState<boolean>(false)
  //CVE items to show before and after filtering 
  const [cveItemsToShow, setCveItemsToShow] = useState<CVE_Item[]>([]) 


  //useEffect fetches data from the backend
  useEffect(()=>{
    const fetchData = async () => {
      try {
        const { data: DataFromApi } = await axios.get<Data>(
          `/data`
        );
        const allDates = DataFromApi.CVE_Items.map((item) => { return item["publishedDate"].split("-")[0]; });
        const uniqueDates = new Set(allDates)
        setData(DataFromApi);
        setCveItemsToShow(DataFromApi.CVE_Items)
        setDates(Array.from(uniqueDates).sort())
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  },[])

  
  return (
    <div className="App">
      <NavBar drawerOpenState={drawerOpenState} setDrawerOpenState={setDrawerOpenState} setFoundByCVEID={setFoundByCVEID} data={data?.CVE_Items}/>
      <div className={classes.root}>
        <DrawerComponent drawerOpenState={drawerOpenState} dates={dates} data={data?.CVE_Items} setCveItemsToShow={setCveItemsToShow} cveItemsToShow={cveItemsToShow}/>
        <div className={classes.content}>
          <ChartAndTable foundByCVEID={foundByCVEID} cveItemsToShow={cveItemsToShow}/>
        </div>
      </div>
    </div>
  );
}

export default App;
