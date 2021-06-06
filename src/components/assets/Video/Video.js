import React from "react";
import {
  AssetWrapper,
  AssetDescription,
  AssetDateCreated,
  AssetVideo,
} from "../AssetStyles";

const Video = ({ dateCreated, nasaId, title, src }) => {
  return (
    <AssetWrapper data-testid="videoAsset">
      <AssetVideo
        key={nasaId}
        src={src}
        alt={title}
        title={title}
        data-testid={nasaId}
      />
      <AssetDescription>{title}</AssetDescription>
      <AssetDateCreated>Created: {dateCreated}</AssetDateCreated>
    </AssetWrapper>
  );
};

export default Video;