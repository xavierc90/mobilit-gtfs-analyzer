import { DatasetProvider } from "./features/dataset/context/DatasetContext";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <DatasetProvider>
      <HomePage />
    </DatasetProvider>
  );
}

export default App;