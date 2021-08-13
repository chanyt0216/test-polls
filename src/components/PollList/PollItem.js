import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { PollDate, PollTitle } from 'components/Styled/Text';
import { PieChart } from 'react-minimal-pie-chart';

const Percentile = styled.div.attrs({
  className:
    'absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 font-bold text-gray-500 xl:text-3xl',
})`
  @media screen and (max-width: 1279px) {
    font-size: 3vw;
  }
  @media screen and (max-width: 767px) {
    font-size: 5vw;
  }
`;

export default function PollItem({ date, title, id }) {
  const lineWidth = 60;
  const history = useHistory();

  return (
    <div
      className="w-full md:w-1/2 border-b border-dotted pb-4 mb-5 md:mb-0"
      onClick={() => {
        history.push(`/${id}`);
      }}
    >
      <div className="flex space-x-4">
        <div className="w-2/5 md:w-1/4">
          <div className="relative">
            <Percentile>%</Percentile>
            <PieChart
              radius={PieChart.defaultProps.radius - 6}
              lineWidth={60}
              labelPosition={100 - lineWidth / 2}
              labelStyle={{
                fill: '#fff',
                opacity: 0.75,
                pointerEvents: 'none',
              }}
              data={[
                { value: 50, color: '#79aac5' },
                { value: 50, color: '#da621f' },
              ]}
            />
          </div>
        </div>
        <div className="flex-1">
          <PollDate>{date}</PollDate>
          <PollTitle>{title}</PollTitle>
        </div>
      </div>
    </div>
  );
}
