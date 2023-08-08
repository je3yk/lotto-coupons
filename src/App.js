import "./App.css";
import { UserValues } from "./components/UserValues";

import WinningNumbers from "./components/WinningNumbers";

import { CouponProvider } from "./context/CouponContext";

function App() {
  return (
    <div className="App">
      <CouponProvider>
        <WinningNumbers />
        <UserValues />
      </CouponProvider>
    </div>
  );
}

export default App;
