import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './routes/Search';
import Main from './routes/Main';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/search">
          <Search></Search>
        </Route>
        <Route path="/">
          <Main></Main>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
