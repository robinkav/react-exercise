import axios from "axios";
import { NASA_BASEURL } from "../shared/constants";

class Service {
  constructor() {
    const service = axios.create({
      baseURL: NASA_BASEURL
    });
    this.service = service;
  }

  get(path, config, callback) {
    return this.service
      .get(path, config)
      .then((response) => callback(null, response.data))
      .catch((error) => {
        callback(error.response);
      });
  }
}

export default new Service();
