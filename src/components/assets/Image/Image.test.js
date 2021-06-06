import { render, screen } from "@testing-library/react";
import Image from "./Image";

describe("Image", () => {
  test("renders correctly based on props", async () => {
    render(
      <Image
        dateCreated="06/06/2021"
        nasaId="123"
        title="This is a sample image"
        href="https://www.sampleimage.co.uk/1.png"
      />
    );

    const imageByTestId = await screen.findByTestId(/123/i);
    const imageByTitle = await screen.findByTitle(/This is a sample image/i);
    const lblDateCreated = await screen.findByText(/06\/06\/2021/i);

    expect(imageByTestId).toBeInTheDocument();
    expect(imageByTitle).toBeInTheDocument();
    expect(lblDateCreated).toBeInTheDocument();
  });
});
