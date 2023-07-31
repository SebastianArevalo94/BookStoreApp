import React, { useEffect, useState } from "react";
import { FaClipboardUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { useSelector } from "react-redux";
import { GetUserById } from "../services/User.service";

const Perfil = () => {
  const user = useSelector((store) => store.user.user);
  const [dataProfile, setDP] = useState({});
  useEffect(() => {
    try {
      GetUserById(user.id).then((resp) => {
        setDP(resp.data);
      });
    } catch (error) {
      GetUserById(localStorage.getItem("userID")).then((resp) => {
        setDP(resp.data);
      });
    }
  }, []);
  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <img
        src={dataProfile.imagen}
        width="250px"
        className="profile-image2"
      />
      <div className="mt-3">
        <div className="d-flex gap-2">
          <FaClipboardUser style={{ fontSize: "45px" }} />{" "}
          <p className="profile-text">Nombre: {dataProfile.nombre}</p>
        </div>
        <div className="d-flex gap-2">
          <MdEmail style={{ fontSize: "45px" }} />{" "}
          <p className="profile-text">Email: {dataProfile.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Perfil;
