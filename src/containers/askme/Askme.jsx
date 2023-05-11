import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './askme.css';


const API_ENDPOINT = 'https://analysis-result.azurewebsites.net/chat';
const Askme = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [app, setApp] = useState("Seleccionar una opción");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  const handleQuestionSubmit = async (event) => {
  event.preventDefault();
  setIsLoading(true); // set isLoading to true when waiting for response
  setResponseText(''); // reset responseText state
  setQuestion(''); // reset question state
  const response = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        app: `${app}`,
        message: `${question}`
    })
  })
  .then(response => response.text())
  .then(data => setResponseText(data));

  setIsLoading(false); // set isLoading to false when response is received
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleTypeSelection = (app) => {
    setApp(app);
    inputRef.current.focus();
  };
  //<button className="btn btn-outline-secondary" type="submit">
  //Preguntar
  //</button>

  
  return (
    <div className="container-fluid">
      <div className="header_gr_text">
      <h1 className="gradient__text">
        AI CUSTOMER SERVICE
      </h1> 
      </div>
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <form onSubmit={handleQuestionSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Haz una pregunta a la AI..."
                aria-label="Haz una pregunta a la AI..."
                aria-describedby="basic-addon2"
                value={question}
                onChange={handleQuestionChange}
                ref={inputRef}
              />
              
              <div className="input-group-append">
                <button className="boton_p1" type="submit">
                  <span>Preguntar</span>
                </button>
              </div>
            </div>
          </form>
          <div className="mb-3">
            <button
              className="boton_p1"
              onClick={() => setShowAdditionalFields(!showAdditionalFields)}
            >
              <span>App</span>
            </button>
          </div>
          {showAdditionalFields && (
            <div className=" mb-3">
              <DropdownButton title={app} variant="outline-secondary">
                <Dropdown.Item onClick={() => handleTypeSelection("BetterSleep")}>
                  BetterSleep 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("Calm")}>
                  Calm 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("Tinder")}>
                  Tinder 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("BBVA")}>
                  BBVA
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("BCP")}>
                  BCP 
                </Dropdown.Item>
              </DropdownButton>
            </div>
          )}
          {isLoading ? (
            <div className="progress mb-3 btn-outline-secondary">
                <div
                  className="progress-bar progress-bar-striped progress-bar-animated"
                  role="progressbar"
                  aria-valuenow="100"
                  aria-valuemin="0"
                  aria-valuemax="100"
                  style={{ width: "100%" }}
                ></div>
            </div>
          
          ) : (
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Respuesta de la AI:</h5>
                <textarea
                  className="form-control"
                  id="responseText"
                  rows="10"
                  value={responseText}
                  onChange={handleResponseChange}
                  readOnly
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

    
};

export default Askme;
