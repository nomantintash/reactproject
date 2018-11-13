import React from "react";
import Sidebar from './sidebar';

const Home = () => {
    return (
      <div style = { styles.container }>
          <div style = { styles.sidebar }>
          <Sidebar/>
          </div>
      </div>
    );
}

export default Home;

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column'
    },
    sidebar: {
        flex: 3,
        display: 'flex',
    }
};
