import React, { useEffect, useState } from "react";
import { FaStickyNote } from "react-icons/fa";
import axios from "axios";

function Header() {
  const [firstName, setFirstName] = useState("");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.get("http://172.20.10.5:4000/userinfo", {
        headers: {
          Authorization: token,
        },
      });
      const user = response.data;
      setFirstName(user.firstName);
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./";
  };

  return (
    <header>
      <div>
      {firstName && <h1>Welcome, {firstName}</h1>}
        <p className="logout" onClick={logOut}>
          Logout
        </p>
      </div>
      
    </header>
  );
}

export default Header;
