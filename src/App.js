import React from 'react';

import { Footer, Header,Askme } from './containers';

import { Navbar} from './components';

import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Askme />
    <Footer />
  </div>
);

export default App;
