import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Search from "./Search";
import { ThemeProvider } from "styled-components";
import mockAxios from "axios";

const fnConsoleError = console.error;

const setup = () => {
  const txtKeywords = screen.getByTestId(/txtKeywords/i);
  const ddlMediaType = screen.getByTestId(/ddlMediaType/i);
  const txtYearStart = screen.getByTestId(/txtYearStart/i);
  const btnSubmitSearch = screen.getByTestId(/btnSubmitSearch/i);

  return {
    txtKeywords,
    ddlMediaType,
    txtYearStart,
    btnSubmitSearch,
  };
};

describe("Search", () => {
  beforeEach(() => {
    console.error = jest.fn();

    render(
      <ThemeProvider theme={{}}>
        <Search />
      </ThemeProvider>
    );
  });

  afterEach(() => {
    console.error = fnConsoleError;
    jest.clearAllMocks();
  });

  describe("Submitting form", () => {
    test("Submitting a valid search form displays expected results with a successful API response", async () => {
      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: mockSearchData,
        })
      );

      const { btnSubmitSearch, txtKeywords, ddlMediaType, txtYearStart } =
        setup();

      fireEvent.change(txtKeywords, { target: { value: "apollo" } });
      fireEvent.change(ddlMediaType, {
        target: {
          value: "image",
        },
      });
      fireEvent.change(txtYearStart, {
        target: {
          value: "1970",
        },
      });
      fireEvent.click(btnSubmitSearch);

      await waitFor(() => {
        expect(btnSubmitSearch.hasAttribute("disabled")).toBe(true);
        expect(btnSubmitSearch).toHaveTextContent("Submitting...");
      });

      await waitFor(() => {
        expect(btnSubmitSearch.hasAttribute("disabled")).toBe(false);
        expect(btnSubmitSearch).toHaveTextContent("Submit");

        expect(mockAxios.get).toBeCalledTimes(1);
        expect(mockAxios.get).toBeCalledWith(
          "https://images-api.nasa.gov/search",
          {
            params: {
              keywords: "apollo",
              media_type: "image",
              year_start: "1970",
            },
          }
        );
      });

      const assets = await screen.findAllByTestId(/imgAsset/i);
      expect(assets.length).toBe(3);
    });

    test("Submitting a valid search form displays expected results with a failed API response", async () => {
      const errResp = {
        status: 500,
        response: { message: "A server error occurred" },
      };
      mockAxios.get.mockImplementationOnce(() => Promise.reject(errResp));

      const { btnSubmitSearch, txtKeywords, ddlMediaType, txtYearStart } =
        setup();

      fireEvent.change(txtKeywords, { target: { value: "apollo" } });
      fireEvent.change(ddlMediaType, {
        target: {
          value: "image",
        },
      });
      fireEvent.change(txtYearStart, {
        target: {
          value: "1970",
        },
      });
      fireEvent.click(btnSubmitSearch);

      const lblApiError = await screen.findByTestId(/lblApiError/i);
      expect(lblApiError).toBeInTheDocument();
    });
  });
});

const mockSearchData = {
  collection: {
    items: [
      {
        links: [
          {
            render: "image",
            rel: "preview",
            href: "https://images-assets.nasa.gov/image/7995383/7995383~thumb.jpg",
          },
        ],
        data: [
          {
            nasa_id: "7995383",
            date_created: "1979-05-01T00:00:00Z",
            keywords: [
              "Montage",
              "Insignia",
              "Logo",
              "Patch",
              "Emblem",
              "Apollo 7",
              "Apollo 8",
              "Apollo 9",
              "Apollo 10",
              "Apollo 11",
              "Apollo 12",
              "Apollo 13",
              "Apollo 14",
              "Apollo 15",
              "Apollo 16",
              "Apollo 17",
            ],
            media_type: "image",
            description:
              "This montage depicts the flight crew patches for the manned Apollo 7 thru Apollo 17 missions.  The Apollo 7 through 10 missions were basically manned test flights that paved the way for lunar landing missions. Primary objectives met included the demonstration of the Command Service Module (CSM) crew performance; crew/space vehicle/mission support facilities performance and testing during a manned CSM mission; CSM rendezvous capability; translunar injection demonstration; the first manned Apollo docking, the first Apollo Extra Vehicular Activity (EVA), performance of the first manned flight of the lunar module (LM); the CSM-LM docking in translunar trajectory, LM undocking in lunar orbit, LM staging in lunar orbit, and manned LM-CSM docking in lunar orbit. Apollo 11 through 17 were lunar landing missions with the exception of Apollo 13 which was forced to circle the moon without landing due to an onboard explosion. The craft was,however, able to return to Earth safely. Apollo 11 was the first manned lunar landing mission and performed the first lunar surface EVA. Landing site was the Sea of Tranquility. A message for mankind was delivered, the U.S. flag was planted, experiments were set up and 47 pounds of lunar surface material was collected for analysis back on Earth.  Apollo 12, the 2nd manned lunar landing mission landed in the Ocean of Storms and retrieved parts of the unmanned Surveyor 3, which had landed on the Moon in April 1967. The Apollo Lunar Surface Experiments Package (ALSEP) was deployed, and 75 pounds of lunar material was gathered. Apollo 14, the 3rd lunar landing mission landed in Fra Mauro. ALSEP and other instruments were deployed, and 94 pounds of lunar materials were gathered, using a hand cart for first time to transport rocks. Apollo 15, the 4th lunar landing mission landed in the Hadley-Apennine region. With the first use of the Lunar Roving Vehicle (LRV), the crew was bale to gather 169 pounds of lunar material. Apollo 16, the 5th lunar landing mission, landed in the Descartes Highlands for the first study of highlands area. Selected surface experiments were deployed, the ultraviolet camera/spectrograph was used for first time on the Moon, and the LRV was used for second time for a collection of 213 pounds of lunar material. The Apollo program came to a close with Apollo 17, the 6th and final manned lunar landing mission that landed in the Taurus-Littrow highlands and valley area. This mission hosted the first scientist-astronaut, Schmitt, to land on the Moon. The 6th automated research station was set up, and 243 ponds of lunar material was gathered using the LRV.  ",
            title: "Saturn Apollo Program",
            center: "MSFC",
          },
        ],
        href: "https://images-assets.nasa.gov/image/7995383/collection.json",
      },
      {
        links: [
          {
            render: "image",
            rel: "preview",
            href: "https://images-assets.nasa.gov/image/AS17-140-21493/AS17-140-21493~thumb.jpg",
          },
        ],
        data: [
          {
            nasa_id: "AS17-140-21493",
            title: "Apollo 17 Mission image - Sta 6,Panoramic,LRV",
            keywords: ["Apollo", "Apollo 17"],
            media_type: "image",
            center: "JSC",
            date_created: "1972-12-13T00:00:00Z",
            description:
              'AS17-140-21493 (13 Dec. 1972) --- The Apollo 17 Lunar Roving Vehicle (LRV) is photographed near a large lunar boulder during the third Apollo 17 extravehicular activity (EVA) at the Taurus-Littrow landing site. About half of the boulder is captured in this scene, photographed by astronaut Eugene A. Cernan, mission commander. While astronauts Cernan and Harrison H. Schmitt descended in the Lunar Module (LM) "Challenger" to explore the lunar surface, astronaut Ronald E. Evans, command module pilot, remained with the Command and Service Modules (CSM) in lunar orbit.',
          },
        ],
        href: "https://images-assets.nasa.gov/image/AS17-140-21493/collection.json",
      },
      {
        links: [
          {
            render: "image",
            rel: "preview",
            href: "https://images-assets.nasa.gov/image/as14-64-9129/as14-64-9129~thumb.jpg",
          },
        ],
        data: [
          {
            nasa_id: "as14-64-9129",
            title: "Apollo 14 Mission image - Pan of the Gnomon during EVA 2. ",
            keywords: ["Apollo", "Apollo 14", "Moon"],
            media_type: "image",
            description:
              'AS14-64-9129 (6 Feb. 1971) --- The two moon-exploring crew men of the Apollo 14 lunar landing mission, photographed and collected the large rock pictured just above the exact center of this picture. (Hold picture with the NASA photographic number at lower right hand corner.) The rock, casting a shadow off to the left, is lunar sample number 14321, referred to as a basketball-sized rock by newsmen and nicknamed "Big Bertha" by principal investigators. It lies between the wheel tracks made by the modular equipment transporter (MET) or rickshaw-type portable workbench. A few prints of the lunar overshoes of the crew members are at the left. This photo was made near the boulder field near the rim of Cone Crater.',
            date_created: "1971-02-06T00:00:00Z",
            center: "JSC",
          },
        ],
        href: "https://images-assets.nasa.gov/image/as14-64-9129/collection.json",
      },
    ],
  },
};
