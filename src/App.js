import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import './App.css';
// comps..
import AirportChooserContainerComponent from './views/aiport-chooser-demo-container'
function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <main>
          <AirportChooserContainerComponent></AirportChooserContainerComponent>
        </main>
      </div>
    </Provider>
  );
}

export default App;
