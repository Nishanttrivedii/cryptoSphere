import { BrowserRouter,Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { styled } from "@mui/system";


import './App.css';

const AppContainer = styled("div")({
  backgroundColor: "#14161a",
  color: "white",
  minHeight: "100vh",
});
function App() {

  
  return (
    <AppContainer>
    <BrowserRouter>
    <div >
 <Header />

     <Routes>
    
     <Route path="/" element={<Homepage />} />
            <Route path="/coins/:id" element={<CoinPage />} />
     </Routes>
    </div>
    </BrowserRouter>
    </AppContainer>
  )
}

export default App