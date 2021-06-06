import { render, screen } from "@testing-library/react";
import Video from "./Video";

describe("Video", () => {
  test("renders correctly based on props", async () => {
    render(
      <Video
        dateCreated="06/06/2021"
        nasaId="123"
        title="This is a sample video file"
        src="https://www.samplevideo.co.uk/1.mp4"
      />
    );

    const videoByTestId = await screen.findByTestId(/123/i);
    const videoByTitle = await screen.findByTitle(/This is a sample video file/i);
    const lblDateCreated = await screen.findByText(/06\/06\/2021/i);

    expect(videoByTestId).toBeInTheDocument();
    expect(videoByTitle).toBeInTheDocument();
    expect(lblDateCreated).toBeInTheDocument();
  });
});
