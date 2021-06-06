import React from "react";
import PropTypes from "prop-types";
import Audio from "../Assets/Audio";
import Video from "../Assets/Video";
import Image from "../Assets/Image";
import { MEDIATYPES } from "../../shared/constants";
import { AssetLibraryWrapper } from "./AssetLibraryStyles";

const AssetLibrary = ({ assets }) => {
  const [audio, video, image] = MEDIATYPES;

  const switchAsset = (asset) => {
    switch (asset.mediaType) {
      case image:
        return (
          <Image
            key={asset.nasaId}
            dateCreated={asset.dateCreated}
            description={asset.description}
            title={asset.title}
            href={asset.href}
          />
        );
      case audio:
        return (
          <Audio
            key={asset.nasaId}
            dateCreated={asset.dateCreated}
            description={asset.description}
            title={asset.title}
            href={asset.href}
          />
        );
      case video:
        return (
          <Video
            key={asset.nasaId}
            dateCreated={asset.dateCreated}
            description={asset.description}
            title={asset.title}
            href={asset.href}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <AssetLibraryWrapper>
      {assets.map((asset) => {
        return switchAsset(asset);
      })}
    </AssetLibraryWrapper>
  );
};

AssetLibrary.propTypes = {
  assets: PropTypes.array,
};

AssetLibrary.defaultProps = {
  assets: [],
};

export default AssetLibrary;
