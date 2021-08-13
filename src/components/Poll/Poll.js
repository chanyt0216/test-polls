import React, { useState, useEffect, useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import moment from 'moment';
import TodayPoll from 'components/PollList/TodayPoll';
import { PollStateContext } from 'context/PollContext';

export default function Poll() {
  const match = useRouteMatch();
  const history = useHistory();
  const [current, setCurrent] = useState(null);
  const { polls } = useContext(PollStateContext);

  useEffect(() => {
    setCurrent(findPoll(parseInt(match.params.id)));

    return () => {
      setCurrent(null);
    };
  }, []);

  function findPoll(id) {
    return polls.find((poll) => {
      // console.log(poll, id);
      return poll.id === id;
    });
  }

  return (
    <div>
      <div
        className="py-4 cursor-pointer"
        onClick={() => {
          history.push(`/`);
        }}
      >
        Back
      </div>
      {current && (
        <div>
          <div className="md:block hidden">
            <div className="text-xl font-bold border-b border-dotted border-gray-300 py-2">
              {current.title}
            </div>
            <div className="text-right py-2">
              PUBLISHED:{' '}
              {moment
                .unix(current.publishedDate)
                .format('DD dddd, MMMM YYYY, h:mm a')}
            </div>
          </div>
          <div>
            <TodayPoll
              qid={parseInt(match.params.id)}
              title={current.title}
              answer={current.answer}
              date={moment.unix(current.publishedDate).format('D MMM YYYY')}
            />
          </div>
        </div>
      )}
    </div>
  );
}
