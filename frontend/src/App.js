import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import UserHome from "./userDashboard/UserHome";
import Admin from "./Admin/Admin";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Register />} />
        <Route path="/userhomepage" element={
          <ProtectedRoute><UserHome /></ProtectedRoute>} />
        <Route path="/adminhomepage" element={
          <ProtectedRoute><Admin /></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App;
