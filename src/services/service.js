import axios from "axios";
import format from "./../utilities/format";

class Service {
  constructor(baseUrl) {
    const service = axios.create();
    this.service = service;
  }

  async get(path, config, { removeEmptyFilters = false }, callback) {
    if (config.params && removeEmptyFilters)
      format.removeEmptyFilters(config.params);
    try {
      const response = await this.service
        .get(path, config);
      return callback(null, response.data);
    } catch (error) {
      console.error(error.message);
      callback(error.response);
    }
  }
}

export default new Service();
