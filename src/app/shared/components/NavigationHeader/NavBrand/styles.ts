import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BrandDiv = styled.div`
  margin: 10px;
`;

export const LogoImg = styled.img`
  max-height: 100px;
  max-width: 200px;
`;

export const LogoSpan = styled.span`
  color: green;
  font-size: calc(18px + 2vmin);
`;

export const BrandLink = styled(Link)`
  text-decoration: none;
`;

export default {};
