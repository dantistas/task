import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CVE_Item } from "../types";
import Paper from '@material-ui/core/Paper';
import { Line } from 'react-chartjs-2';


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: '100%',
  },
});



interface Props {
  cveItemsToShow: CVE_Item[] | [];
}


const Chart: React.FC<Props> = (props: Props) => {
    const { cveItemsToShow } = props;
    const classes = useStyles();

    const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

    // maps cve-items by month
    const byMonth = (severity:string) => {
        return xLabels.map((label, index)=>(cveItemsToShow.filter((cve)=>(parseInt(cve.publishedDate.split("-")[1],10) === index+1 && cve.impact.baseMetricV2?.severity === severity))))
    }

    const data = {
        labels: xLabels,
        datasets: [
          {
            label: 'Minor',
            data: byMonth("LOW").map((byMonth)=>(byMonth.length)),
            fill: false,
            backgroundColor: 'rgb(60, 179, 113)',
            borderColor: 'rgb(60, 179, 113)',
          },
          {
            label: 'Major',
            data: byMonth("MEDIUM").map((byMonth)=>(byMonth.length)),
            fill: false,
            backgroundColor: 'rgb(255, 165, 0)',
            borderColor: 'rgb(255, 165, 0)',
          },
          {
            label: 'Critical',
            data: byMonth("HIGH").map((byMonth)=>(byMonth.length)),
            fill: false,
            backgroundColor: 'rgb(255, 0, 0)',
            borderColor: 'rgb(255, 0, 0)',
          },
        ],
      };
      
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };


  return (
      <Paper className={classes.root}>
          <div className={classes.container}>
            <Line type="line" data={data} options={options} />
          </div>
      </Paper>
  );
}


export default Chart