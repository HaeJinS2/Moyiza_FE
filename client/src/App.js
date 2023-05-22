import './App.css';
import Router from "./shared/Router";
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <div>
      <RecoilRoot>
        <Router />
      </RecoilRoot>
    </div>
  );
}

export default App;
