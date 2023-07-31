import React, { useState } from "react";
import { RegisterAPI } from "../services/User.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserRedux } from "../redux/userSlice";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";

const Register = () => {
  const userDefault = {
    Nombre: "",
    Contrasenia: "",
    Email: "",
    Imagen: "",
  };

  const [dataRegister, setDR] = useState(userDefault);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setDR({
      ...dataRegister,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      dataRegister.Imagen = reader.result;
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    RegisterAPI(dataRegister)
      .then((resp) => {
        if (resp.status == 201) {
          navigate("/");
          localStorage.setItem("token", resp.token);
          dispatch(setUserRedux(jwt_decode(resp.token)));
          localStorage.setItem("userID", jwt_decode(resp.token).id);
        } else if (resp.status == 400) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: resp.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((resp) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: resp.message,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <div className="login-div">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Nombre
          </label>
          <input
            type="text"
            className="form-control"
            id="Nombre"
            name="Nombre"
            placeholder="Escribe tu nombre"
            value={dataRegister.Nombre}
            onChange={handleInputChange}
          />
        </div>

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
            value={dataRegister.Email}
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
            value={dataRegister.Contrasenia}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Imagen">Imagen</label>
          <input
            type="file"
            className="form-control-file"
            id="Imagen"
            onChange={handleFileChange}
          />
        </div>
        <button className="btn btn-primary mt-3" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
