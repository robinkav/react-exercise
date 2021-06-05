import { camelizeKeys } from "humps";
import { MEDIATYPES } from "./../shared/constants";

const format = {
  asset: ({ collection }) => {
    return formatItem(collection.items[0]);
  },
  search: ({ collection }) => {
    return collection.items.slice(0, 10).map((item) => formatItem(item));
  },
};

const formatItem = (item) => {
  const [audio, video, image] = MEDIATYPES;
  const camelizedItem = camelizeJSON(item);
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
