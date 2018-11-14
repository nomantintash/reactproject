import React from "react";

const NavBar = (props) => {
  return (
      <div style = {styles.container}>
          <input style = {styles.inputField}
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search Videos"
            width = "300px"
            aria-label="Search"
            onChange = { props.search }
          />
      </div>
  );
};

const styles = {
  container : {
    paddingTop: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  inputField: {
    textAlign:'center',
    width: '600px'
  }
}

export default NavBar;
