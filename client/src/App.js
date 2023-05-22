import "./App.css";
import Router from "./shared/Router";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <Router />
        </RecoilRoot>
      </QueryClientProvider>
    </div>
  );
}

export default App;
