
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import ViewUserChannel from "./Components/Pagecomponents/ViewUserChannel";
import { Toaster } from "react-hot-toast";
import VideoUpload from "./Components/Pagecomponents/VideoUpload";
import UserAllvideos from "./Components/Pagecomponents/UserAllvideos";
import EachVideoDetail from "./Components/Pagecomponents/EachVideoDetail";
import CreateChannel from "./Components/Pagecomponents/CreateChannel";
import ProtectedRoute from "./Components/Pagecomponents/ProtectedRoute";


function App() {
 
  return (
    <>
      <div className="app px-[2vw] ">
       <Routes>
        <Route path="/" element={<Home />}>
      <Route path="channel/:channelid" element={<ProtectedRoute><ViewUserChannel /></ProtectedRoute>}></Route>
        </Route>
        {/*  videos route */}
        <Route path="/uploadvideo" element={<ProtectedRoute><VideoUpload /></ProtectedRoute>}></Route>
        <Route path="/myvideos" element={<ProtectedRoute><UserAllvideos /></ProtectedRoute>}></Route>
        <Route path="/video/:videoid" element={<EachVideoDetail />}></Route>
         {/* channel route */}
        <Route path="/createchannel" element={<ProtectedRoute><CreateChannel /></ProtectedRoute>}></Route>
        </Routes>
       <Toaster />
      </div>
     
    </>
  )
}

export default App
