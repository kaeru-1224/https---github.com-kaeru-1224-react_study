import Header from "./Header";
import Main from "./Todolist";
import Todocheck from "./Todocheck";
import "./App.css";

function App() {
  return (
    <section className="todoapp">
      <div>
        <Header />
        <Main />
        <Todocheck />
      </div>
    </section>
  );
}

export default App;
