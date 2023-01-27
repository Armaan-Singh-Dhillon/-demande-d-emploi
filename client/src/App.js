import Landing from "./pages/Landing";
import { BrowserRouter, Routes, Route } from "react-router-dom"
import SharedLayout from "./components/SharedLayout";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Register from "./pages/Register";
import DashboardLayout from "./components/DashboardLayout.js";
import Stats from "./pages/dashboard/stats";
import Alljobs from "./pages/dashboard/alljobs";
import Profile from "./pages/dashboard/profile";
import Addjob from "./pages/dashboard/addjob";

function App() {
  return (<>
    <BrowserRouter>

      <Routes>
        <Route path='/' element={<SharedLayout></SharedLayout>}>

          <Route path='/' element={<Landing></Landing>}> </Route>
         
          <Route path='/register' element={<Register></Register>}> </Route>


        </Route>
        <Route path='/dashboard' element={<DashboardLayout></DashboardLayout>}>
          <Route path='/dashboard/stats' element={<Stats></Stats>}> </Route>
          <Route path='/dashboard/all-jobs' element={<Alljobs></Alljobs>}> </Route>
          <Route path='/dashboard/profile' element={<Profile></Profile>}> </Route>
          <Route path='/dashboard/add-job' element={<Addjob></Addjob>}> </Route>
          
           </Route>
        <Route path='*' element={<Error></Error>}></Route>


      </Routes>
    </BrowserRouter>
   
  </>

  );
}

export default App;
