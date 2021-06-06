import styled from "styled-components";

export const AssetWrapper = styled.div`
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  margin: 0.5rem;
  border: 1px solid #ccc;
  width: 300px;
  height: 0%;
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
