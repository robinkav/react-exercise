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
  },
  getImage: ({ links = [] }) => {
    const [first = {}] = links;
    const { href = "/images/not-found.png" } = first;
    return href;
  },
  getAudio: ({ href }) => {
    return href;
  },
  getVideo: ({ href }) => {
    return href;
  },
};

const formatItem = (item) => {
  const [audio, video, image] = MEDIATYPES;
  const camelizedItem = camelizeJSON(item);
  if (!camelizedItem || !camelizedItem.data) return;

  const data = camelizedItem.data[0];

  const {
    dateCreated,
    description,
    nasaId,
    secondaryCreator,
    title,
    mediaType,
  } = data;

  const commonProps = {
    dateCreated: new Date(dateCreated).toLocaleDateString("en-GB"),
    description,
    nasaId,
    secondaryCreator,
    title,
    mediaType,
  };

  switch (mediaType) {
    case audio:
      return { ...commonProps, href: format.getAudio(camelizedItem) };
    case image:
      return { ...commonProps, href: format.getImage(camelizedItem) };
    case video:
      return { ...commonProps, href: format.getVideo(camelizedItem) };
    default:
      return;
  }
};

const camelizeJSON = (json) =>
  camelizeKeys(json, (key, convert) => {
    return /^[A-Z0-9_]+$/.test(key) ? key : convert(key);
  });

export default format;
