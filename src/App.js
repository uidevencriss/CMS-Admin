import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Editor } from "./components/Editor";
import { RenderedPage } from "./components/RenderedPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Client from "./app/puckpath/client"
import BlogField from "./pages/BlogField";
import Clients from "./app/ForEdit/client";
function App() {
  return (
   
    <Router>
    
      {/* <div>
        <h1>Welcome to the CMS App</h1>
        <ul>
          <li>
            <Link to="/editor">Go to Editor</Link>
          </li>
          <li>
            <Link to="/rendered-page">View Rendered Page</Link>
          </li>
        </ul>
        </div> */}
        <Routes>
          {/* <Route path="/editor" element={<Editor />} /> */}
          {/* <Route path="/rendered-page" element={<RenderedPage />} /> */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/blogfield" element={<BlogField />} />
          <Route path="/blogs/reactapp" element={<Client path="/blogs/reactapp" />} />
          <Route path="/blogs/reactapp/edit" element={<Client isEdit path="/blogs/reactapp" />} />
          <Route path="/blogs/reactapps" element={<Clients path="/blogs/reactapps" />} />
          <Route path="/blogs/reactapps/edits" element={<Clients isEdit path="/blogs/reactapps" />} />
        </Routes>
        
    </Router>
  
  );
}

export default App;
