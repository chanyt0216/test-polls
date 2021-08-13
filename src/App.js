import Poll from 'components/Poll/Poll';
import PollList from 'components/PollList/PollList';
import PollContextProvider, {
  PollDispatchContext,
  PollStateContext,
} from 'context/PollContext';
import { useEffect, useContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import axios from 'config/axios';

function Content() {
  const { isSubmit } = useContext(PollStateContext);
  const dispatch = useContext(PollDispatchContext);

  useEffect(() => {
    axios.get('/results.json').then((res) => {
      dispatch({ type: 'SET_RESULT', payload: res.data });
    });
  }, [isSubmit]);
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <Switch>
        <Route path="/:id">
          <Poll />
        </Route>
        <Route path="/">
          <PollList />
        </Route>
      </Switch>
    </div>
  );
}

function App() {
  return (
    <>
      <PollContextProvider>
        <Content />
      </PollContextProvider>
    </>
  );
}

export default App;
