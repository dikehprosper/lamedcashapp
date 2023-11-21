import React from "react";
import Head from "@/components/(userscomponent)/(head)/head";
// import Display from "@/components/(userscomponent)/(display)/display";
import "./profile.css";
// import { TbPigMoney } from "react-icons/tb";
// import { RiMoneyDollarCircleLine } from "react-icons/ri";
// import TransactionTemplate from "@/components/(userscomponent)/(TransactionTemplateUsers)/TransactionTemplate";
// import { LuHistory } from "react-icons/lu";
const Profile = async () => {
  return (
    <div className='user_profile_container'>
      <Head title='Profil' about='Modifiez vos informations personnelles ici' />
    </div>
  );
};

export default Profile;
