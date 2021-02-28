import SceneManager from "./components/logic/SceneManager";

export default function App() {
  return (
    <div className="App">
      <SceneManager initialScene="ManagementScene" />
    </div>
  );
}
