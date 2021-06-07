import Service from "./service";
import mockAxios from "axios";

const fnConsoleError = console.error;

describe("service", () => {
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = fnConsoleError;
    jest.clearAllMocks();
  });

  describe("get", () => {
    test("A successful GET response is handled correctly", async () => {
      const callback = jest.fn(() => {});

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve(mockResponses.success)
      );

      await Service.get("", {}, true, callback);

      expect(callback).toBeCalledTimes(1);
      expect(callback).toBeCalledWith(null, mockResponses.success.data);
    });

    test("An unsuccessful GET response is handled correctly", async () => {
      const callback = jest.fn(() => { });

      mockAxios.get.mockImplementationOnce(() =>
        Promise.reject(mockResponses.failure)
      );

      await Service.get("", {}, true, callback);

      expect(callback).toBeCalledTimes(1);
      expect(callback).toBeCalledWith(mockResponses.failure.response);
    });
  });
});

const mockResponses = {
  success: {
    data: {
      collection: {
        items: [],
      },
    },
  },
  failure: {
    status: 500,
    response: { message: "A server error occurred" },
  },
};
