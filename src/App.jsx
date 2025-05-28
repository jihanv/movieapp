import { useState } from "react";

import "./index.css";

const Card = (props) => {
  const [hasLiked, setHasLiked] = useState(false);
  return (
    <div className="card">
      <h2>{props.title}</h2>
      <button onClick={(prev) => setHasLiked(!prev.hasLiked)}>{hasLiked? "Liked" : "Like"}</button>
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
