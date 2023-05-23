import React from "react";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <center>
 <footer>
      <p> David Oyewale ⓒ {year}</p>
    </footer>
    </center>
   
  );
}

export default Footer;
