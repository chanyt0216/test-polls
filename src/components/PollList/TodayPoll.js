import React, { useState, useContext } from 'react';
import { PollDate, PollTitle } from 'components/Styled/Text';
import PollChart from 'components/Poll/PollChart';
import { COLORS_LIST, getResultCount } from 'utils/common';
import { PollDispatchContext, PollStateContext } from 'context/PollContext';
import Answers from './Answers';
import axios from 'config/axios';

export default function TodayPoll({ title, answer, date, isTodayPoll, qid }) {
  const { results } = useContext(PollStateContext);
  const dispatch = useContext(PollDispatchContext);
  const isSingle = answer.type === 'Single';
  const [selected, setSelected] = useState([]);
  let total = 0;

  let options =
    results !== null
      ? answer.options.map((option, index) => {
          let list = { ...option };
          list.title = option.label;
          list.color = COLORS_LIST[index];
          list.value = getResultCount(results, qid, option.id);
          total += list.value;
          return list;
        })
      : [];

  function onAnswerClick(id) {
    if (selected.includes(id)) {
      const newList = selected.filter(function (value) {
        return value !== id;
      });

      setSelected(newList);
    } else {
      if (isSingle) {
        setSelected([id]);
      } else {
        setSelected([...selected, id]);
      }
    }
  }

  function onSubmit() {
    if (!isSingle) {
      const list = selected.map((item) => {
        return axios.post('/results.json', {
          qid: qid,
          aid: item,
        });
      });

      Promise.all(list).then(() => {
        dispatch({ type: 'SET_SUBMIT', payload: true });
      });
    } else {
      axios
        .post('/results.json', {
          qid: qid,
          aid: selected[0],
        })
        .then(dispatch({ type: 'SET_SUBMIT', payload: true }));
    }
  }

  return (
    <div
      className={[
        isTodayPoll ? 'bg-gray-300' : 'bg-blue-200',
        'w-full py-4 px-4 mb-8',
      ].join(' ')}
    >
      {isTodayPoll && <div>Today's Poll</div>}
      <div className="flex flex-wrap justify-between">
        <div className="w-full md:flex-1">
          {isTodayPoll && (
            <PollTitle>
              {title} <PollDate>{date}</PollDate>
            </PollTitle>
          )}
          {!isTodayPoll && (
            <PollTitle className="md:hidden block">{title} </PollTitle>
          )}
          <Answers
            options={options}
            onClick={onAnswerClick}
            selected={selected}
          />
        </div>
        <div className=" max-w-sm  md:max-w-none mx-auto w-full md:w-2/5 lg:w-1/4">
          <PollChart data={options} />
        </div>
      </div>
      <div className=" border-b border-dashed border-gray-400 pb-3 mb-3 md:text-left text-center">
        Total number of votes recorded: {total}
      </div>

      <button
        onClick={() => {
          onSubmit();
          setSelected([]);
        }}
        className={[
          'bg-red-500 text-white py-2 mr-0 ml-auto w-32 block text-center',
          selected.length === 0 ? ' opacity-25' : '',
        ].join(' ')}
        disabled={selected.length === 0}
      >
        Submit
      </button>
    </div>
  );
}
