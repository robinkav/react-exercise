import React from "react";
import {
  AssetWrapper,
  AssetAudio,
  AssetDescription,
  AssetDateCreated,
} from "../AssetStyles";

const Audio = ({ dateCreated, nasaId, title, src }) => {
  return (
    <AssetWrapper data-testid="audioAsset">
      <AssetAudio
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

export default Audio;