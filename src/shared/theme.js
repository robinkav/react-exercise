import styled from "styled-components";

export const SiteWrapper = styled.div`
  max-width: 1200px;
  min-width: 200px;
  margin: 0 auto;
  padding: 1rem;
`;

export const FormSearchWrapper = styled.div`
  margin: 0 -1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const FilterWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-basis: 200px;
  flex-direction: column;
  padding: 1rem;
`;

export const KeywordsFilterWrapper = styled(FilterWrapper)`
  flex-grow: 3;
  flex-basis: 400px;
`;

export const FormSubmitWrapper = styled.div`
  margin: 0 -1rem;
  display: flex;
  flex-grow: 0;
  flex-direction: column;
  padding: 1rem;
`;
