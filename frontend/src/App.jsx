
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import ViewUserChannel from "./components/Pagecomponents/ViewUserChannel";
import { Toaster } from "react-hot-toast";
import VideoUpload from "./components/Pagecomponents/VideoUpload";
import UserAllvideos from "./components/Pagecomponents/UserAllvideos";
import EachVideoDetail from "./components/Pagecomponents/EachVideoDetail";
import CreateChannel from "./components/Pagecomponents/CreateChannel";
import ProtectedRoute from "./components/Pagecomponents/ProtectedRoute";


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
