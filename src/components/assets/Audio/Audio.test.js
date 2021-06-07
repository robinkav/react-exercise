import { render, screen } from "@testing-library/react";
import Audio from "./Audio";
import Service from "../../../services/service";

describe("Audio", () => {
  beforeAll(() => {
    Service.get = jest.fn();
  });

  beforeEach(() => {
    render(
      <Audio
        dateCreated="10/04/2020"
        nasaId="Ep139_Apollo 13"
        title="HWHAP Ep139 Apollo 13"
        href="https://images-assets.nasa.gov/audio/Ep139_Apollo 13/collection.json"
      />
    );
  });

  test("renders correctly based on props", async () => {
    const audioByTestId = await screen.findByTestId(/Ep139_Apollo 13/i);
    const audioByTitle = await screen.findByTitle(/HWHAP Ep139 Apollo 13/i);
    const lblDateCreated = await screen.findByText(/10\/04\/2020/i);

    expect(audioByTestId).toBeInTheDocument();
    expect(audioByTitle).toBeInTheDocument();
    expect(lblDateCreated).toBeInTheDocument();
  });
});
