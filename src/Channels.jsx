import React from 'react';

const Channels = (props) => {
  const { channels } = props;
  if (channels.length === 0) {
    return null;
  }
  return (
    <div className="col-3 border-right">
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li key={id} className="nav-item">{name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Channels;
