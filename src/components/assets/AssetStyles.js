import styled from "styled-components";

export const AssetWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  margin: 0.5rem;
  border: 1px solid #ccc;
  width: 300px;
  height: 0%;
  box-shadow: 5px 5px 10px #555;
  -moz-box-shadow: 5px 5px 10px #555;
  -webkit-box-shadow: 5px 5px 10px #555;
  &:hover {
    border: 1px solid #777;
  }
`;

export const AssetDescription = styled.span`
  padding: 0.5rem;
  word-break: break-all;
`;

export const AssetDateCreated = styled.span`
  display: inline-block;
  font-size: 0.8rem;
  padding: 0 0.5rem;
  text-align: end;
`;

export const AssetImage = styled.img`
  width: 100%;
  height: auto;
`;

export const AssetVideo = styled.video`
  width: 100%;
  height: auto;
`;
