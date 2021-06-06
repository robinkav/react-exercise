import React from "react";
import {
  AssetWrapper,
  AssetImage,
  AssetDescription,
  AssetDateCreated,
} from "./AssetStyles";

const Image = ({ dateCreated, nasaId, title, href }) => {
  return (
    <AssetWrapper>
      <AssetImage
        key={nasaId}
        src={href}
        alt={title}
        title={title}
        data-testid="imgAsset"
      />
      <AssetDescription>{title}</AssetDescription>
      <AssetDateCreated>Created: {dateCreated}</AssetDateCreated>
    </AssetWrapper>
  );
};

export default Image;
