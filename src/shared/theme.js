import styled from "styled-components";

export const SiteWrapper = styled.div`
  max-width: 1200px;
  min-width: 200px;
  margin: 0 auto;
  padding: 1rem;
`;

export const Banner = styled.div`
  padding: 0.75rem 1.25rem;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  width: 100%;
`;

export const AlertBanner = styled(Banner)`
  color: #721c24;
  background-color: #f8d7da;
  border-color: #f5c6cb;
`;
