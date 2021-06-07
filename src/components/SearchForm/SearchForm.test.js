import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { ThemeProvider } from "styled-components";

const setup = () => {
  const txtKeywords = screen.getByTestId(/txtKeywords/i);
  const valKeywords = screen.queryByTestId(/valKeywords/i);
  const ddlMediaType = screen.getByTestId(/ddlMediaType/i);
  const valMediaType = screen.queryByTestId(/valKeywords/i);
  const txtYearStart = screen.getByTestId(/txtYearStart/i);
  const valYearStart = screen.queryByTestId(/valYearStart/i);
  const btnSubmitSearch = screen.getByTestId(/btnSubmitSearch/i);

  return {
    txtKeywords,
    valKeywords,
    ddlMediaType,
    valMediaType,
    txtYearStart,
    valYearStart,
    btnSubmitSearch,
  };
};

describe("SearchForm", () => {
  beforeEach(() => {
    const onSubmit = jest.fn();

    const props = {
      onSubmit,
    };

    render(
      <ThemeProvider theme={{}}>
        <SearchForm {...props} />
      </ThemeProvider>
    );
  });

  describe("Form validation", () => {
    test("Does not display any validation error messages when initially loaded", () => {
      const { valKeywords, valMediaType, valYearStart } = setup();

      expect(valKeywords).not.toBeInTheDocument();
      expect(valMediaType).not.toBeInTheDocument();
      expect(valYearStart).not.toBeInTheDocument();
    });

    test("Shows the correct validation error messages when search is submitted with blank inputs", async () => {
      const { btnSubmitSearch } = setup();

      fireEvent.click(btnSubmitSearch);

      const valKeywords = await screen.findByText(
        "Please enter keywords to search."
      );

      const valMediaType = await screen.findByText(
        "Please select a media type."
      );

      expect(valKeywords).toBeInTheDocument();
      expect(valMediaType).toBeInTheDocument();
      await waitFor(() =>
        expect(screen.queryByTestId(/valYearStart/i)).not.toBeInTheDocument()
      );
    });

    test("Shows the correct validation error message when keywords input is empty after touch", async () => {
      const { txtKeywords } = setup();

      fireEvent.focus(txtKeywords);
      fireEvent.blur(txtKeywords);

      const valKeywords = await screen.findByText(
        "Please enter keywords to search."
      );

      expect(valKeywords).toBeInTheDocument();
    });

    test("Shows the correct validation error message when keywords text is less than 2 characters", async () => {
      const { txtKeywords } = setup();

      fireEvent.change(txtKeywords, { target: { value: "a" } });
      fireEvent.blur(txtKeywords);

      const valKeywords = await screen.findByText(
        "Keywords must be between 2 and 50 characters."
      );

      expect(valKeywords).toBeInTheDocument();
    });

    test("Shows the correct validation error message when keywords text is more than 50 characters", async () => {
      const { txtKeywords } = setup();

      fireEvent.change(txtKeywords, {
        target: {
          value: "this is a sample search of slightly more than 50 characters",
        },
      });
      fireEvent.blur(txtKeywords);

      const valKeywords = await screen.findByText(
        "Keywords must be between 2 and 50 characters."
      );

      expect(valKeywords).toBeInTheDocument();
    });

    test("Shows the correct validation error message when media type is changed then removed", async () => {
      const { ddlMediaType } = setup();

      fireEvent.change(ddlMediaType, {
        target: {
          value: "image",
        },
      });

      fireEvent.change(ddlMediaType, {
        target: {
          value: "",
        },
      });

      fireEvent.blur(ddlMediaType);

      const valMediaType = await screen.findByText(
        "Please select a media type."
      );

      expect(valMediaType).toBeInTheDocument();
    });

    test("Shows the correct validation error message when the year start filter is not a year", async () => {
      const { txtYearStart } = setup();

      fireEvent.change(txtYearStart, {
        target: {
          value: "not a year",
        },
      });
      fireEvent.blur(txtYearStart);

      const valYearStart = await screen.findByText(
        "Please enter a valid year."
      );

      expect(valYearStart).toBeInTheDocument();
    });

    test("Shows the correct validation error message when the year start filter is set in the future", async () => {
      const { txtYearStart } = setup();

      fireEvent.change(txtYearStart, {
        target: {
          value: "2050",
        },
      });
      fireEvent.blur(txtYearStart);

      const valYearStart = await screen.findByText(
        "Year must not be in the future."
      );

      expect(valYearStart).toBeInTheDocument();
    });
  });
});
