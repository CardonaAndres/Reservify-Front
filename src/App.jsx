import './assets/css/index.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { router } from './configs/config.js';
import { Welcome } from "./pages/common/Welcome.jsx";
import { LoginPage } from "./pages/auth/LoginPage.jsx";
import { RegisterPage } from "./pages/auth/RegisterPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { ProtectedRoute } from "./components/auth/ProtectedRoute.jsx";
import { Dashboard } from "./pages/common/Dashboard.jsx";
import { UpdatePassword } from './pages/auth/UpdatePassword.jsx';
import { Profile } from './pages/users/Profile.jsx';
import { AdminDashboard } from './pages/admin/AdminDashboard.jsx';
import { AccessControl } from './components/auth/AccessControl.jsx';
import { ManageUsers } from './pages/admin/ManageUsers.jsx';
import { ManageTables } from './pages/admin/ManageTables.jsx';
import { ManageSchedule } from './pages/admin/ManageSchedule.jsx';
import { MyReservations } from './pages/users/MyReservations.jsx';
import { ManageReservations } from './pages/admin/ManageReservations.jsx';
import { ManageRequests } from './pages/admin/ManageRequests.jsx';
import { MyRequests } from './pages/users/MyRequests.jsx';
import { ManagePayments } from './pages/admin/ManagePayments.jsx';

function App() {

  return (
    <AuthProvider>
        <BrowserRouter>
            <Routes>
              <Route path={router.home} element={<Welcome/>} />
              <Route path={router.login} element={<LoginPage/>} />
              <Route path={router.register} element={<RegisterPage/>} />
              <Route path={router.updatePassword} element={<UpdatePassword/>} />
              
              <Route element={<ProtectedRoute/>}>                       
                  <Route path={router.dashboard} element={<Dashboard />} />
                  <Route path={router.profile} element={<Profile />} />
                  <Route path={router.myReservations} element={<MyReservations />} />
                  <Route path={router.myRequests} element={<MyRequests />} />

                  <Route element={<AccessControl />}>
                    <Route path={router.adminOptions} element={<AdminDashboard/>} />
                    <Route path={router.users} element={<ManageUsers />} />
                    <Route path={router.tables} element={<ManageTables />} />
                    <Route path={router.schedules} element={<ManageSchedule />} />
                    <Route path={router.reservations} element={<ManageReservations />} />
                    <Route path={router.requests} element={<ManageRequests />} />
                    <Route path={router.payments} element={<ManagePayments />} />
                  </Route>           
              </Route>

              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
     
    </AuthProvider>

  )
}

export default App
