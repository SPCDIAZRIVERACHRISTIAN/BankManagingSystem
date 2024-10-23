import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Home from "./pages/Home"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoutes"
import AddCreditCardPage from "./pages/AddCreditCard"
import AddDebitCardPage from "./pages/AddDebitCard"
import AddLoanPage from "./pages/AddLoan"
import PayLoans from "./pages/PayLoans"
import EditCreditPage from "./pages/EditCredit"
import EditDebitPage from "./pages/EditDebit"

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route path="/register" element={<RegisterAndLogout />}></Route>
        <Route path="/add-debit" element={<AddDebitCardPage />}></Route>
        <Route path="/add-credit" element={<AddCreditCardPage />}></Route>
        <Route path="/add-loan" element={<AddLoanPage />}></Route>
        <Route path="/pay-loan/:id" element={<PayLoans />}></Route>
        <Route path="/edit-credit/:id" element={<EditCreditPage />}></Route>
        <Route path="/edit-debit/:id" element={<EditDebitPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
