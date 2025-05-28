// import { useState } from 'react'

import "./index.css";

const Card = (props) => {
  return (
    <div style={{
      border: '1px solide "#4b5362"',
      padding: '20px',
      margin: '10px',
      backgroundClip: "#31363f",
      borderRadius: "10px",
      minHeight: "100px"
    }}>
      <h2>{props.title}</h2>
    </div>
  );
};
const App = () => {
  return (
    <div className="card-container">
      <Card title="Star Wars"/>
      <Card title="The Lion King"/>
      <Card title="Avatar"/>
    </div>
  )
};

export default App;
