import './App.css';
import { useEffect } from "react";
import AppNavbar from './components/AppNavbar';
import ShoppingList from './components/ShoppingList';
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./action/authAction";

import ItemModal from './components/ItemModal';
import {Container} from 'reactstrap';

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])
  // Provider has to be the parent element for the app as this provides/shares the state of all, to all the child components under it
  return (
    <Provider store={store}>
      <div className="App">
        <AppNavbar/>
        <Container>
          <ItemModal/>
          <ShoppingList />
        </Container>
      </div>
    </Provider>
  );
}

export default App;
