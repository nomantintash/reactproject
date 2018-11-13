import React from "react";
import MediaUpload from './upload';
import MediaDetail from './media-detail';
import Media from './media';
import MyVideos from './my-videos';
import { Route } from 'react-router-dom';
import Sidebar from './sidebar';

const Home = () => {
    return (
      <div style = { styles.container }>
          <div style = { styles.sidebar }>
          <Sidebar/>
          <Route path="/home/media-detail/:mediaKey" component = { MediaDetail } />
          <Route path="/home/upload" component={ MediaUpload } />
          <Route exact path = "/" component = { Media }/>
          <Route exact path = "/home" component = { Media }/>
          <Route exact path = "/home/my-videos" component = { MyVideos }/>
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
