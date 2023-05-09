import React from 'react';

import { Footer, Blog, Possibility, Features,WhatGPT3, Header,Askme } from './containers';

import { CTA, Brand, Navbar} from './components';

import './App.css';

const App = () => (
  <div className="App">
    <div className="gradient__bg">
      <Navbar />
      <Header />
    </div>
    <Brand />
    <WhatGPT3 />
    <Features />
    <Possibility />
    <CTA />
    <Blog />
    <Askme />
    <Footer />
  </div>
);

export default App;
