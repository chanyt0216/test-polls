import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import styled from 'styled-components';

const Percentile = styled.div.attrs({
  className:
    'absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-bold text-white xl:text-6xl',
})`
  @media screen and (max-width: 1279px) {
    font-size: 4vw;
  }
  @media screen and (max-width: 767px) {
    font-size: 10vw;
  }
`;

export default function PollChart({ data }) {
  const lineWidth = 60;

  return (
    <div className="relative">
      <Percentile>%</Percentile>
      <PieChart
        radius={PieChart.defaultProps.radius - 6}
        lineWidth={60}
        animate
        label={({ dataEntry }) => Math.round(dataEntry.percentage)}
        labelPosition={100 - lineWidth / 2}
        labelStyle={{
          fill: '#fff',
          opacity: 0.75,
          pointerEvents: 'none',
        }}
        data={data}
      />
    </div>
  );
}
