import React from "react";
import UserDashboard from "../../../components/(userscomponent)/(dashboard)/userDashboard";
import Head from "@/components/(userscomponent)/Head";

const Dashboard = async () => {
  return (
    <div className='user_dashboard_container'>
      <Head />
      <UserDashboard />
    </div>
  );
};

export default Dashboard;
