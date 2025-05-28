// import { useState } from 'react'

import "./index.css";

const Card = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
    </div>
  );
};
const App = () => {
  return (
    <>
      <h2>New Content</h2>
      <Card title="Star Wars"/>
      <Card title="The Lion King"/>
      <Card title="Avatar"/>
    </>
  );
};

export default App;
