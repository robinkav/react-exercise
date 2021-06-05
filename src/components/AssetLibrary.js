import React from "react";
import PropTypes from "prop-types";
import Audio from "./assets/Audio";
import Video from "./assets/Video";
import Image from "./assets/Image";
import { MEDIATYPES } from "./../shared/constants";

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
      default:
        return <></>;
    }
  };

  return (
    <div>
      {assets.map((asset) => {
        return switchAsset(asset);
      })}
    </div>
  );
};

AssetLibrary.propTypes = {
  assets: PropTypes.array,
};

AssetLibrary.defaultProps = {
  assets: [],
};

export default AssetLibrary;
