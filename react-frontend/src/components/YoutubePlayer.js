import React from 'react';

const YoutubePlayer = ({ key, title }) => {
  const youtubeSrc = `https://www.youtube.com/embed/${key}?autoplay=1`;
  return (
    <div className="container centerAlign">
      <div className="row">
        <div className="col videoContainer" style={{ height: '100%' }}>
          <iframe
            title={title}
            allowFullScreen
            src={youtubeSrc}
            className="video"
            allow="autoplay"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default YoutubePlayer;
