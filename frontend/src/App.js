import { useState, useEffect } from "react";

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
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import NotFound from "./pages/NotFound";
import TagTours from "./pages/tours/TagTours";

import { io } from "socket.io-client";
import Category from "./pages/Category";

const profile = localStorage.getItem("profile");
if (profile) {
  store.dispatch({
    type: AUTH_SUCCESS,
    payload: JSON.parse(profile),
  });
}

function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5000"));
  }, []);

  useEffect(() => {
    if (socket) {
      const user = JSON.parse(profile);
      socket.emit("newUser", user.user.name);
    }
  }, [socket, profile]);

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <Header socket={socket} />
          <Routes>
            <Route path="/" element={<Home socket={socket} />} />
            <Route path="/search" element={<Home />} />
            <Route path="/tours/tags/:tag" element={<TagTours />} />
            <Route path="/tours/categories/:category" element={<Category />} />
            <Route path="/tour/:id" element={<TourDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/addTour"
              element={
                <PrivateRoute>
                  <AddEditTour />
                </PrivateRoute>
              }
            />
            <Route
              path="/editTour/:id"
              element={
                <PrivateRoute>
                  <AddEditTour />
                </PrivateRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
