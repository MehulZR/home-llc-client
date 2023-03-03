import LoginForm from "./components/login";
import ResetPassword from "./components/resetpassword";
import SignupForm from "./components/signup";
import Home from "./components/home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      if (cookies[i].match(/^LoggedIn=.+/)) {
        if (!loggedIn) setLoggedIn(true);
        return;
      }
    }
    setLoggedIn(false);
  });
  return (
    <BrowserRouter>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<Home setLoggedIn={setLoggedIn} />} />
        ) : (
          <>
            <Route path="/" element={<LoginForm setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
