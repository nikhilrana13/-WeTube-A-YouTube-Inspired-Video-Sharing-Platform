
import {Routes,Route} from "react-router-dom"
import Home from "./pages/Home";
import ViewUserChannel from "./Components/Pagecomponents/ViewUserChannel";
import { Toaster } from "react-hot-toast";
import VideoUpload from "./Components/Pagecomponents/VideoUpload";
import UserAllvideos from "./Components/Pagecomponents/UserAllvideos";
import EachVideoDetail from "./Components/Pagecomponents/EachVideoDetail";
import CreateChannel from "./Components/Pagecomponents/CreateChannel";


function App() {
 
  return (
    <>
      <div className="app px-[2vw] ">
       <Routes>
        <Route path="/" element={<Home />}>
        <Route path="channel/:channelid" element={<ViewUserChannel />}></Route>
        </Route>
        {/*  videos route */}
        <Route path="/uploadvideo" element={<VideoUpload />}></Route>
        <Route path="/myvideos" element={<UserAllvideos  />}></Route>
        <Route path="/video/:videoid" element={<EachVideoDetail />}></Route>
         {/* channel route */}
        <Route path="/createchannel" element={<CreateChannel />}></Route>
        </Routes>
       <Toaster />
      </div>
     
    </>
  )
}

export default App
