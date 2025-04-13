import React from "react";
import HighlightIcon from '@mui/icons-material/Highlight';

function Header() {
  return (
    <header>
      <h1>
        <HighlightIcon style={{ color: "white" }} /> 
        Keeper
      </h1>
    </header>
  );
}

export default Header;
