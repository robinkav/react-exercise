import React, { useEffect, useState, useRef } from "react";
import Service from "../../../services/service";
import {
  AssetWrapper,
  AssetDescription,
  AssetDateCreated,
  AssetVideo,
} from "../AssetStyles";

const Video = ({ dateCreated, nasaId, title, href }) => {
  const [sources, setSources] = useState([]);
  const videoRef = useRef();

  useEffect(() => {
    const getVideoLocation = () => {
      Service.get(href, {}, false, (error, data) => {
        if (!error) {
          setSources(data);
        }
        if (videoRef.current) {
          videoRef.current.load();
        }
      });
    };
    getVideoLocation();
  }, [href]);

  return (
    <AssetWrapper data-testid="videoAsset">
      <AssetVideo
        controls
        ref={videoRef}
        key={nasaId}
        alt={title}
        title={title}
        data-testid={nasaId}
      >
        {sources && sources.map((src, index) => {
          return <source src={src} key={`${nasaId}_video_${index}`} />;
        })}
        Your browser does not support the video tag.
      </AssetVideo>
      <AssetDescription>{title}</AssetDescription>
      <AssetDateCreated>Created: {dateCreated}</AssetDateCreated>
    </AssetWrapper>
  );
};

export default Video;
