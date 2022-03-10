import React from "react";
import SideMenu from "./SideMenu";
import "./admin.css";
import UsersList from "./UsersList";

const Dashboard = () => {
  return (
    <section id="admin-dashboard">
      <SideMenu />
      <UsersList />
    </section>
  );
};

export default Dashboard;
