import "./App.css";
import Sidebar from "./components/Sidebar";
import Checkout from "./components/Checkout";
import Stock from "./components/Stock";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  return (
    <div className="app">
      <Sidebar />

      <main>
        <h1>POS SYSTEM</h1>
        <Checkout items={items} setItems={setItems} />
        <Stock items={items} setItems={setItems} />
      </main>
    </div>
  );
}

export default App;