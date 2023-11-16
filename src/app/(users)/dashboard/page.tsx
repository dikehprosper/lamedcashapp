import React from "react";
import Head from "@/components/(userscomponent)/(head)/head";
import Display from "@/components/(userscomponent)/(display)/display";
import "./.css";
import { TbPigMoney } from "react-icons/tb"
const Dashboard = async () => {
  return (
    <div className='user_dashboard_container'>
      <Head
        title='Bienvenue'
        about="Faites l'expérience de dépôts et de retraits rapides"
      />
      <div className='user-dashboard-display'>
        <Display
          count={1}
          title='Dépôt'
          amount={345566789868.99}
          style={{ color: "#658900", background: "rgba(101, 137, 0, 0.4)", icon:<TbPigMoney /> }}
        />
        <Display
          count={1}
          title='Retirer'
          amount={320086834890.99}
          style={{ color: "#0076B8", background: "rgba(0, 118, 184, .4)", icon: <TbPigMoney /> }}
        />
      </div>
    </div>
  );
};

export default Dashboard;
