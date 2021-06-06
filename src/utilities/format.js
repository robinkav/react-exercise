import { camelizeKeys } from "humps";
import { MEDIATYPES } from "./../shared/constants";

const format = {
  search: ({ collection }) => {
    const validAssets = [];
    let counter = 0;
    if (!collection || !collection.items) return [];

    while (
      validAssets &&
      validAssets.length < 10 &&
      collection.items[counter]
    ) {
      const formattedAsset = formatItem(collection.items[counter]);
      if (formattedAsset) {
        validAssets.push(formattedAsset);
      }
      counter++;
    }
    return validAssets;
  },
  removeEmptyFilters: (params) => {
    for (const key of Object.keys(params)) {
      if (params[key].trim() === "") {
        delete params[key];
      }
    }
  }
};

const formatItem = (item) => {
  const [audio, video, image] = MEDIATYPES;
  const camelizedItem = camelizeJSON(item);
  if (!camelizedItem || !camelizedItem.data || !camelizedItem.links) return;

  const data = camelizedItem.data[0];
  const link = camelizedItem.links[0];
  const {
    dateCreated,
    description,
    nasaId,
    secondaryCreator,
    title,
    mediaType,
  } = data;

  const commonProps = {
    dateCreated,
    description,
    nasaId,
    secondaryCreator,
    title,
    mediaType,
  };

  switch (mediaType) {
    case audio:
      return { ...commonProps, ...getAudio(link) };
    case image:
      return { ...commonProps, href: getImage(link) };
    case video:
      return { ...commonProps, ...getVideo(link) };
    default:
      return commonProps;
  }
};

const camelizeJSON = (json) =>
  camelizeKeys(json, (key, convert) => {
    return /^[A-Z0-9_]+$/.test(key) ? key : convert(key);
  });

const getImage = ({ href }) => {
  return href;
};

const getAudio = (link) => {
  return "/audio";
};

const getVideo = (link) => {
  return "/video";
};

export default format;
