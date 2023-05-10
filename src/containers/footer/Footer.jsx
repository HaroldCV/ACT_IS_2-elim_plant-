import React from 'react';
import gpt3Logo from '../../logo.svg';
import './footer.css';

const Footer = () => (
  <div className="gpt3__footer section__padding">
    <div className="gpt3__footer-links">
      <div className="gpt3__footer-links_logo">
        <img src={gpt3Logo} alt="gpt3_logo" />
        <p>Software II - UTEC</p>
      </div>
      <div className="gpt3__footer-links_div">
        <h4>Team</h4>
        <p>Eduardo Arróspide</p>
        <p>Pedro Domínguez</p>
        <p>Harold Canto</p>
      </div>
    </div>

    <div className="gpt3__footer-copyright">
      <p>@2023 Ctrl+Alt+Defeat. All rights reserved.</p>
    </div>
  </div>
);

export default Footer;
