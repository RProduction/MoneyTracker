import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import {
  VictoryChart,
  VictoryLine,
  VictoryArea,
  VictoryGroup,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis
} from 'victory';

import { Money } from '../models/Money';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    padding: theme.spacing(2)
  }
}));

type OverallChartProps = {
  value: Money[]
}

interface Domain {
  
}

function OverallChart({ value }: OverallChartProps) {
  const styles = useStyles();
  const [selectedDomain, setSelectedDomain] = useState<any>([]);
  const [zoomDomain, setZoomDomain] = useState<any>([]);
  
  const handleZoom = (domain: any) => {
    setSelectedDomain(domain);
  };

  const handleBrush = (domain: any) => {
    setZoomDomain(domain);
  };

  const data = value.map((value) => {
    const rawDate = value.date.split("/");
    return {
      x: new Date(
        parseInt(rawDate[2]), 
        parseInt(rawDate[1]), 
        parseInt(rawDate[0])
      ),
      y: value.type === 'increase' ? value.value : -value.value
    }
  });

  let tick: Date[] = [];
  let minYear = data[0].x.getFullYear();
  const maxYear = data[data.length-1].x.getFullYear();
  while(minYear <= maxYear) {
    tick.push(new Date(minYear, 1, 1));
    minYear += 1;
  }

  return (
    <Grid item className={styles.root}>
      <VictoryChart
        width={window.innerWidth}
        height={window.innerHeight - 420}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer responsive={true}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryGroup
          style={{
            data: { strokeWidth: 5, fillOpacity: 0.2 }
          }}
        >
          <VictoryArea
            style={{
              data: { fill: 'cyan', stroke: "cyan" }
            }}
            data={data}
          />
        </VictoryGroup>

      </VictoryChart>
      
      <VictoryChart
        style={{
          parent: {
            height: "auto"
          }
        }}
        width={window.innerWidth}
        height={75}
        scale={{ x: "time" }}
        padding={{ top: 0, left: 100, right: 100, bottom: 30 }}
        containerComponent={
          <VictoryBrushContainer responsive={true}
            brushDimension="x"
            brushDomain={selectedDomain}
            onBrushDomainChange={handleBrush}
          />
        }
      >
        <VictoryAxis
          tickValues={tick}
          tickFormat={(x) => new Date(x).getFullYear()}
        />
        <VictoryLine
          style={{
            data: { stroke: "cyan" }
          }}
          data={data}
        />
      </VictoryChart>
    </Grid>
  )
}

export default OverallChart;