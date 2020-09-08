import React from 'react';
import Channels from './Channels';

const App = (props) => {
  const { channels } = props;

  return (
    <div className="row h-100 pb-3">
      <Channels channels={channels} />
    </div>
  );
};

export default App;
