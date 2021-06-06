import { render, screen } from "@testing-library/react";
import Audio from "./Audio";

describe("Audio", () => {
  test("renders correctly based on props", async () => {
    render(
      <Audio
        dateCreated="06/06/2021"
        nasaId="123"
        title="This is a sample audio file"
        src="https://www.sampleaudio.co.uk/1.mp3"
      />
    );

    const audioByTestId = await screen.findByTestId(/123/i);
    const audioByTitle = await screen.findByTitle(/This is a sample audio file/i);
    const lblDateCreated = await screen.findByText(/06\/06\/2021/i);

    expect(audioByTestId).toBeInTheDocument();
    expect(audioByTitle).toBeInTheDocument();
    expect(lblDateCreated).toBeInTheDocument();
  });
});
