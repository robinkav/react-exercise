import React, { useEffect, useState, useRef } from "react";
import Service from "../../../services/service";
import {
  AssetWrapper,
  AssetDescription,
  AssetDateCreated,
} from "../AssetStyles";

const Audio = ({ dateCreated, nasaId, title, href }) => {
  const [sources, setSources] = useState([]);
  const audioRef = useRef();

  useEffect(() => {
    const getAudioLocation = async () => {
      Service.get(href, {}, false, (error, data) => {
        if (!error) {
          setSources(data);
        }
        if (audioRef.current) {
          audioRef.current.load();
        }
      });
    };

    getAudioLocation();
  }, [href]);

  return (
    <AssetWrapper data-testid="audioAsset">
      <audio
        controls
        ref={audioRef}
        key={nasaId}
        alt={title}
        title={title}
        data-testid={nasaId}
      >
        {sources && sources.map((src, index) => {
          return <source src={src} key={`${nasaId}_audio_${index}`} />;
        })}
        Your browser does not support the audio element.
      </audio>
      <AssetDescription>{title}</AssetDescription>
      <AssetDateCreated>Created: {dateCreated}</AssetDateCreated>
    </AssetWrapper>
  );
};

export default Audio;
