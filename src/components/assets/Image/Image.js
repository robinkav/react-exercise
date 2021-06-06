import React from "react";
import {
  AssetWrapper,
  AssetImage,
  AssetDescription,
  AssetDateCreated,
} from "../AssetStyles";

const Image = ({ dateCreated, nasaId, title, href }) => {
  return (
    <AssetWrapper data-testid="imgAsset">
      <AssetImage
        key={nasaId}
        src={href}
        alt={title}
        title={title}
        data-testid={nasaId}
      />
      <AssetDescription>{title}</AssetDescription>
      <AssetDateCreated>Created: {dateCreated}</AssetDateCreated>
    </AssetWrapper>
  );
};

export default Image;
