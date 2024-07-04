import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './LoginComponent'; 
import Project from './ProjectComponent'; 
import { useEffect } from 'react';

const App = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/login'); 
    const messageListener = (event: MessageEvent) => {
        const message = event.data; 
        if (message.command === 'changeRoute') {
          history.push('/projects');
        }
    };

    window.addEventListener('message', messageListener);

    return () => {
        window.removeEventListener('message', messageListener);
    };
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