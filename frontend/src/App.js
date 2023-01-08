import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { ToastContainer } from "react-toastify";
import "./App.css";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Home from "./pages/Home";
import AddEditTour from "./pages/tours/AddEditTour";

import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import { AUTH_SUCCESS } from "./actions/types";
import TourDetails from "./pages/tours/TourDetails";

const profile = localStorage.getItem("profile");
if (profile) {
  store.dispatch({
    type: AUTH_SUCCESS,
    payload: JSON.parse(profile),
  });
}

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addTour" element={<AddEditTour />} />
            <Route path="/editTour/:id" element={<AddEditTour />} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
