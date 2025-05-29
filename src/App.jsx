import { useState, useEffect } from "react";

import "./index.css";

const Card = (props) => {
  const [count, setCount] = useState(0)
  const [hasLiked, setHasLiked] = useState(false);

  function addCount(){
    setCount((prev)=> prev+1)
  }
  useEffect(() => console.log(`${props.title} has been liked.`), [hasLiked])
  return (
    <div className="card" onClick={addCount}>
      <h2>{props.title} - <br/>{count>0? count: ""}</h2>
      <button onClick={() => setHasLiked((prev)=> !prev)}>{hasLiked? "Liked" : "Like"}</button>
    </div>
  );
};
const App = () => {
  return (
    <div className="card-container">
      <Card title="Star Wars" />
      <Card title="The Lion King" />
      <Card title="Avatar" />
    </div>
  );
};

export default App;
