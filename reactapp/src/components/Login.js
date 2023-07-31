import React, { useState } from "react";
import { LoginAPI } from "../services/User.service";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserRedux } from "../redux/userSlice";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const Login = () => {
  const defaultDataLogin = {
    Email: "",
    Contrasenia: "",
  };

  const [dataLogin, setDataLogin] = useState(defaultDataLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setDataLogin({
      ...dataLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginAPI(dataLogin)
      .then((resp) => {
        if (resp.status == 200) {
          navigate("/");
          localStorage.setItem("token", resp.token);
          dispatch(setUserRedux(jwt_decode(resp.token)));
          localStorage.setItem("userID", jwt_decode(resp.token).id);
        } else if (resp.status == 401 || resp.status == 400) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch();
  };

  return (
    <div className="login-div">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="Email"
            placeholder="Enter email"
            value={dataLogin.Email}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="Contrasenia"
            placeholder="Password"
            value={dataLogin.Contrasenia}
            onChange={handleInputChange}
          />
        </div>
        <p
          onClick={() => {
            navigate("/register");
          }}
        >
          No tienes una cuenta? Registrate
        </p>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
