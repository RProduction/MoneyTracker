import React, {useState} from 'react';

import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import {
  VictoryChart,
  VictoryLine,
  VictoryZoomContainer,
  VictoryBrushContainer,
  VictoryAxis
} from 'victory';

import { Money } from '../models/Money';

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {

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
  while(minYear < maxYear) {
    tick.push(new Date(minYear, 1, 1));
    minYear += 2;
  }

  return (
    <Grid item>
      <VictoryChart
        width={550}
        height={300}
        scale={{ x: "time" }}
        containerComponent={
          <VictoryZoomContainer responsive={true}
            zoomDimension="x"
            zoomDomain={zoomDomain}
            onZoomDomainChange={handleZoom}
          />
        }
      >
        <VictoryLine
          style={{
            data: { stroke: "tomato" }
          }}
          data={data}
        />

      </VictoryChart>
      
      <VictoryChart
        width={550}
        height={90}
        scale={{ x: "time" }}
        padding={{ top: 0, left: 50, right: 50, bottom: 30 }}
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
            data: { stroke: "tomato" }
          }}
          data={data}
        />
      </VictoryChart>
    </Grid>
  )
}

export default OverallChart;