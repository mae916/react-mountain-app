import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './routes/Search';

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Search></Search>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
