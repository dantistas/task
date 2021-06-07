/// chart and tsx
import React, {useState} from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { CVE_Item } from "../types";
import Toolbar from '@material-ui/core/Toolbar';
import CVETable from './CVETable'
import Chart from './Chart'


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
  }),
);

interface Props {
  cveItemsToShow: CVE_Item[] | [];
  foundByCVEID: CVE_Item[] | null;
}

const ChartAndTable: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { cveItemsToShow, foundByCVEID } = props;


  return (
    <div >
      <main className={classes.content}>
        <Toolbar />
        <CVETable  cveItemsToShow={cveItemsToShow} foundByCVEID={foundByCVEID}/>
        <Toolbar/>
        <Chart cveItemsToShow={cveItemsToShow}/>
      </main>
    </div>
  );
}


export default ChartAndTable