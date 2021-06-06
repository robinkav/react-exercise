import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import AssetLibrary from "./AssetLibrary";

describe("AssetLibrary", () => {
  beforeEach(() => {
    render(
      <ThemeProvider theme={{}}>
        <AssetLibrary assets={mockAssets} />
      </ThemeProvider>
    );
  });

  it("Renders the correct number of assets based on type", async () => {
    const imageAssets = await screen.findAllByTestId(/imgAsset/i);
    const audioAssets = await screen.findAllByTestId(/audioAsset/i);
    const videoAssets = await screen.findAllByTestId(/videoAsset/i);
    expect(imageAssets.length).toBe(6);
    expect(audioAssets.length).toBe(2);
    expect(videoAssets.length).toBe(2);
  });
});

const mockAssets = [
  {
    dateCreated: "1979-05-01T00:00:00Z",
    description:
      "This montage depicts the flight crew patches for the manned Apollo 7 thru Apollo 17 missions.  The Apollo 7 through 10 missions were basically manned test flights that paved the way for lunar landing missions. Primary objectives met included the demonstration of the Command Service Module (CSM) crew performance; crew/space vehicle/mission support facilities performance and testing during a manned CSM mission; CSM rendezvous capability; translunar injection demonstration; the first manned Apollo docking, the first Apollo Extra Vehicular Activity (EVA), performance of the first manned flight of the lunar module (LM); the CSM-LM docking in translunar trajectory, LM undocking in lunar orbit, LM staging in lunar orbit, and manned LM-CSM docking in lunar orbit. Apollo 11 through 17 were lunar landing missions with the exception of Apollo 13 which was forced to circle the moon without landing due to an onboard explosion. The craft was,however, able to return to Earth safely. Apollo 11 was the first manned lunar landing mission and performed the first lunar surface EVA. Landing site was the Sea of Tranquility. A message for mankind was delivered, the U.S. flag was planted, experiments were set up and 47 pounds of lunar surface material was collected for analysis back on Earth.  Apollo 12, the 2nd manned lunar landing mission landed in the Ocean of Storms and retrieved parts of the unmanned Surveyor 3, which had landed on the Moon in April 1967. The Apollo Lunar Surface Experiments Package (ALSEP) was deployed, and 75 pounds of lunar material was gathered. Apollo 14, the 3rd lunar landing mission landed in Fra Mauro. ALSEP and other instruments were deployed, and 94 pounds of lunar materials were gathered, using a hand cart for first time to transport rocks. Apollo 15, the 4th lunar landing mission landed in the Hadley-Apennine region. With the first use of the Lunar Roving Vehicle (LRV), the crew was bale to gather 169 pounds of lunar material. Apollo 16, the 5th lunar landing mission, landed in the Descartes Highlands for the first study of highlands area. Selected surface experiments were deployed, the ultraviolet camera/spectrograph was used for first time on the Moon, and the LRV was used for second time for a collection of 213 pounds of lunar material. The Apollo program came to a close with Apollo 17, the 6th and final manned lunar landing mission that landed in the Taurus-Littrow highlands and valley area. This mission hosted the first scientist-astronaut, Schmitt, to land on the Moon. The 6th automated research station was set up, and 243 ponds of lunar material was gathered using the LRV.  ",
    nasaId: "7995383",
    title: "Saturn Apollo Program",
    mediaType: "image",
    href: "https://images-assets.nasa.gov/image/7995383/7995383~thumb.jpg",
  },
  {
    dateCreated: "1972-12-13T00:00:00Z",
    description:
      'AS17-140-21493 (13 Dec. 1972) --- The Apollo 17 Lunar Roving Vehicle (LRV) is photographed near a large lunar boulder during the third Apollo 17 extravehicular activity (EVA) at the Taurus-Littrow landing site. About half of the boulder is captured in this scene, photographed by astronaut Eugene A. Cernan, mission commander. While astronauts Cernan and Harrison H. Schmitt descended in the Lunar Module (LM) "Challenger" to explore the lunar surface, astronaut Ronald E. Evans, command module pilot, remained with the Command and Service Modules (CSM) in lunar orbit.',
    nasaId: "AS17-140-21493",
    title: "Apollo 17 Mission image - Sta 6,Panoramic,LRV",
    mediaType: "audio",
    href: "https://images-assets.nasa.gov/image/AS17-140-21493/AS17-140-21493~thumb.jpg",
  },
  {
    dateCreated: "1971-02-06T00:00:00Z",
    description:
      'AS14-64-9129 (6 Feb. 1971) --- The two moon-exploring crew men of the Apollo 14 lunar landing mission, photographed and collected the large rock pictured just above the exact center of this picture. (Hold picture with the NASA photographic number at lower right hand corner.) The rock, casting a shadow off to the left, is lunar sample number 14321, referred to as a basketball-sized rock by newsmen and nicknamed "Big Bertha" by principal investigators. It lies between the wheel tracks made by the modular equipment transporter (MET) or rickshaw-type portable workbench. A few prints of the lunar overshoes of the crew members are at the left. This photo was made near the boulder field near the rim of Cone Crater.',
    nasaId: "as14-64-9129",
    title: "Apollo 14 Mission image - Pan of the Gnomon during EVA 2. ",
    mediaType: "video",
    href: "https://images-assets.nasa.gov/image/as14-64-9129/as14-64-9129~thumb.jpg",
  },
  {
    dateCreated: "1971-02-06T00:00:00Z",
    description:
      "AS14-64-9181 (5-6 Feb. 1971) --- A view of the lunar terrain at the Apollo 14 Fra Mauro landing site as photographed through the left window of the Lunar Module (LM). Note the clump of lunar soil in the foreground, and a crater in the center on the horizon. While astronauts Alan B. Shepard Jr., commander; and Edgar D. Mitchell, lunar module pilot; descended in the LM to explore the moon, astronaut Stuart A. Roosa, command module pilot, remained with the Command and Service Modules (CSM) in lunar orbit.",
    nasaId: "as14-64-9181",
    title: "Apollo 14 Mission image - 360 degree pan from EVA 2. ",
    mediaType: "image",
    href: "https://images-assets.nasa.gov/image/as14-64-9181/as14-64-9181~thumb.jpg",
  },
  {
    dateCreated: "1971-02-05T00:00:00Z",
    description:
      "AS14-66-9293 (5 Feb. 1971) --- A portion of the Fra Mauro landing site as photographed by one of the Apollo 14 astronauts, standing slightly southwest of the Lunar Module (LM), during the early minutes of their first extravehicular activity (EVA) on the moon. The shadow of the astronaut taking the picture is at lower right. Photographs numbered AS14-66-9271 through AS14-66-9293 comprise a 360 degree panoramic view.",
    nasaId: "as14-66-09293",
    title:
      "   Apollo 14 Mission image - View of the Lunar Surface towards the western Horizon. ",
    mediaType: "audio",
    href: "https://images-assets.nasa.gov/image/as14-66-09293/as14-66-09293~thumb.jpg",
  },
  {
    dateCreated: "1972-04-16T00:00:00Z",
    description:
      "AS16-120-19242 (16-27 April 1972) --- This 70mm handheld camera's view of the moon, photographed during the Apollo 16 mission's lunar orbit, features Crater Bullialdus, located at approximately 20 degrees south latitude and 20.8 west longitude.",
    nasaId: "as16-120-19242",
    title:
      "Apollo 16 Mission image - 70mm handheld camera view of the moon featuring the Bullialdus Crater.",
    mediaType: "image",
    href: "https://images-assets.nasa.gov/image/as16-120-19242/as16-120-19242~thumb.jpg",
  },
  {
    dateCreated: "1972-04-23T00:00:00Z",
    description:
      "AS16-122-19527 (23 April 1972) --- The Apollo 16 Lunar Module (LM) ascent stage, with astronauts John W. Young and Charles M. Duke Jr. aboard, returns from the lunar surface to rejoin the Command and Service Modules (CSM) in lunar orbit. Astronaut Thomas K. (Ken) Mattingly II took this photograph from the Command Module (CM). The LM is above the Crater Schubert B. The lunar surface area visible in this picture is located at the western edge of Smyth's Sea.",
    nasaId: "as16-122-19527",
    title:
      "Apollo 16 Mission image - View of the Schubert B Crater during LM Rendezvous.",
    mediaType: "image",
    href: "https://images-assets.nasa.gov/image/as16-122-19527/as16-122-19527~thumb.jpg",
  },
  {
    dateCreated: "1972-12-13T00:00:00Z",
    description:
      "AS17-146-22296 (13 Dec. 1972) --- Astronaut Harrison H. Schmitt, lunar module pilot, works near the Lunar Roving Vehicle (LRV) during the third Apollo 17 extravehicular activity (EVA) at the Taurus-Littrow site on the lunar surface. The front part of the LRV is out of frame at left, but the seats and several geological tools can be seen. The photo was taken by astronaut Eugene A. Cernan, mission commander.",
    nasaId: "as17-146-22296",
    title:
      "Apollo 17,Lunar Roving Vehicle and Astronaut Harrison Schmitt during EVA 3",
    mediaType: "image",
    href: "https://images-assets.nasa.gov/image/as17-146-22296/as17-146-22296~thumb.jpg",
  },
  {
    dateCreated: "1972-12-07T00:00:00Z",
    description:
      'AS17-162-24050 (7-19 Dec. 1972) --- Astronaut Eugene A. Cernan appears to be relaxing in this candid photograph taken by a fellow crewman aboard the Apollo 17 spacecraft during the final lunar landing mission in NASA\'s Apollo program. Also, aboard Apollo 17 were astronaut Ronald E. Evans, command module pilot, and scientist-astronaut Harrison H. "Jack" Schmitt, lunar module pilot. Cernan was the mission commander.',
    nasaId: "as17-162-24050",
    title: "Apollo 17,Eugene A. Cernan inside the Command Module",
    mediaType: "image",
    href: "https://images-assets.nasa.gov/image/as17-162-24050/as17-162-24050~thumb.jpg",
  },
  {
    dateCreated: "1972-12-07T00:00:00Z",
    description:
      'AS17-145-22216 (7-19 Dec. 1972) --- In this view looking out the Lunar Module (LM) windows shows the United States Flag on the moon\'s surface. This view looks toward the north Massif. The LM thrusters can be seen in foreground. While astronauts Eugene A. Cernan, commander, and Harrison H. Schmitt, lunar module pilot, descended in the LM "Challenger" to explore the Taurus-Littrow region of the moon, astronaut Ronald E. Evans, command module pilot, remained with the Command and Service Modules (CSM) "America" in lunar orbit.',
    nasaId: "AS17-145-22216",
    title: "Apollo 17, Panorama of the moon from Lunar Module",
    mediaType: "video",
    href: "https://images-assets.nasa.gov/image/AS17-145-22216/AS17-145-22216~thumb.jpg",
  },
];
