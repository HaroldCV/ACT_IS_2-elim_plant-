import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './askme.css';


const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const API_KEY = "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";
const Askme = () => {
  const [question, setQuestion] = useState('');
  const [responseText, setResponseText] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
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
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt: `Pregunta: ${question}\nRespuesta:`,
      max_tokens: 100,
      temperature: 0.5,
      n: 1,
      stop: '\n',
    })
  });
    const data = await response.json();
    console.log(data);
    if (data.choices && data.choices.length > 0) {
      console.log(data.choices[0].text);
      setResponseText(data.choices[0].text);
    } else {
      console.log('No se encontró respuesta para esta pregunta');
      setResponseText('Lo siento, no puedo responder esa pregunta');
    }
    setIsLoading(false); // set isLoading to false when response is received
  };

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleTypeSelection = (text) => {
    setQuestion(text);
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
              <span>Tipo</span>
            </button>
          </div>
          {showAdditionalFields && (
            <div className=" mb-3">
              <DropdownButton title="Selecciona un tipo de comentario" variant="outline-secondary">
                <Dropdown.Item onClick={() => handleTypeSelection("La banca móvil del BCP es mala")}>
                  La banca móvil del BCP es mala 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("La google plastores no sirve")}>
                  La google plastores no sirve 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("No tiene nada de amigable tinder")}>
                  No tiene nada de amigable tinder 
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("Es malisima la app de Movistar")}>
                  Es malisima la app de Movistar
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleTypeSelection("La app de canvas es excelente ")}>
                  La app de canvas es excelente 
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
