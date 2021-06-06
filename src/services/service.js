import axios from "axios";
import { NASA_BASEURL } from "../shared/constants";
import format from './../utilities/format';

class Service {
  constructor() {
    const service = axios.create({
      baseURL: NASA_BASEURL
    });
    this.service = service;
  }

  get(path, config, { removeEmptyFilters = false }, callback) {
    if(config.params && removeEmptyFilters) format.removeEmptyFilters(config.params);
    return this.service
      .get(path, config)
      .then((response) => callback(null, response.data))
      .catch((error) => {
        callback(error.response);
      });
  }
}

export default new Service();
