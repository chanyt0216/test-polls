import React, { useContext } from 'react';
import moment from 'moment';
import PollItem from 'components/PollList/PollItem';
import TodayPoll from 'components/PollList/TodayPoll';
import { PollStateContext } from 'context/PollContext';

export default function PollList() {
  const { polls } = useContext(PollStateContext);

  return (
    <div className="flex flex-wrap">
      {polls.map((poll, index) => {
        const { title, answer, publishedDate, id } = poll;

        return index === 0 ? (
          <TodayPoll
            key={id}
            title={title}
            answer={answer}
            date={moment.unix(publishedDate).format('D MMM YYYY')}
            isTodayPoll={true}
            qid={id}
          />
        ) : (
          <PollItem
            key={id}
            id={id}
            date={moment.unix(publishedDate).format('D MMM YYYY')}
            title={title}
          />
        );
      })}
    </div>
  );
}
