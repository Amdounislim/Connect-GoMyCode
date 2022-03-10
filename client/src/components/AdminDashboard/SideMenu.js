import React, { useState } from "react";
import logo from "../../images/logo-GMC-white.png";

const SideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <aside
      id="admin-menu"
      className={isOpen ? "open-menu" : "closed-menu"}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {!isOpen && (
        <span style={{ color: "#e50e37", alignSelf: "flex", fontSize: "30px" }}>
          &raquo;
        </span>
      )}
      <div className={isOpen ? "brand-logo" : "hidedn"}>
        <img
        alt="gomycode-logo"
          src={logo}
          width="160px"
          height="35px"
          className={!isOpen && "hidden"}
        />
      </div>
      <ul className={!isOpen && "hidden"}>
        <li>Users</li>
        <li>Profiles</li>
        <li>Admin</li>
      </ul>
    </aside>
  );
};

export default SideMenu;
