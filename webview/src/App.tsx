import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './LoginComponent'; 
import Project from './ProjectComponent'; 
import { useEffect } from 'react';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/projects'); 
  }, [history]);

  return ( 
    <> 
      <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/projects" component={Project} />
      </Switch>
    </>
  );
}
 
export default App;