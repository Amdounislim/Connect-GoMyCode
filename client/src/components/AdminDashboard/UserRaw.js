import React from "react";
import { Link } from "react-router-dom";
import AddScore from "./AddScore";
import SwitchButton from "../layouts/switch-btn/SwitchButton";

const UserRaw = ({
  user: { name, lastName, phone, email, isGranted, _id },
  deleteUser,
  verifyAccess
}) => {
  return (
    <tbody>
      <tr>
        <td>
          {" "}
          <Link to={`/profile/${_id}`} style={{ textDecoration: "underline" }}>
            {`${name.toUpperCase()} ${lastName.toUpperCase()}`}{" "}
          </Link>{" "}
        </td>
        <td>{email}</td>
        <td>{phone}</td>
        <td>
          <SwitchButton
            onClick={() => verifyAccess(_id)}
            isGranted={isGranted}
          />
        </td>
        <td>
          <Link to={`/admin/profile/${_id}`}>
            <button
              style={{
                padding: "0.5rem 1rem",
                background: "##f9f9f9",
                border: "none",
                color: "#262626",
                cursor: "pointer"
              }}
            >
              Certification Score
            </button>
          </Link>
        </td>
        <td>
          <i className="fa fa-trash" onClick={() => deleteUser(_id)}></i>
        </td>
      </tr>
    </tbody>
  );
};

export default UserRaw;
