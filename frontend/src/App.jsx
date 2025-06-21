
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
         <Route path="channel/:channelid" element={<ViewUserChannel />}></Route>
        </Route>
         {/* protected routes */}
         <Route element={<ProtectedRoute />}>
        <Route path="/uploadvideo" element={<VideoUpload />}></Route>
         <Route path="/myvideos" element={<UserAllvideos />}></Route>
        <Route path="/createchannel" element={<CreateChannel />}></Route>
        
          </Route>
      <Route path="/video/:videoid" element={<EachVideoDetail />}></Route>
    
        </Routes>
       <Toaster />
      </div>
     
     
    </>
  )
}

export default App
