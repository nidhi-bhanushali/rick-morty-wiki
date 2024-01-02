import styled from "styled-components";

export const StyledHeading = styled.h1`
  margin: 0px;
  margin-top: 20px;
  text-align: center;
`;

export const StyledGridContainer = styled.div`
  background: #272b33;
  padding: 50px 0px;
  > .infinite-scroll-component__outerdiv > div {
    display: grid;
    grid-template-columns: ${({ isMobile }) =>
      !isMobile ? "repeat(auto-fill, 600px)" : "repeat(auto-fill, 300px)"};
    column-gap: 12px;
    justify-content: center;

    @media (max-width: 650px) and (min-width: 430px) {
      grid-template-columns: 1fr;
    }
  }
`;

export const CharacterCard = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (!isMobile ? "row" : "column")};
  // height: ${({ isMobile }) => !isMobile && "220px"};
  // width: ${({ isMobile }) => !isMobile && "600px"};
  border-radius: 8px;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 12px 0px;
  cursor: pointer;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  @media (max-width: 650px) and (min-width: 430px) {
    width: 100%;
  }
`;

export const StyledImage = styled.img`
  width: 100%;
  // height: 100%;
  margin: 0px;
  opacity: 1;
  transition: opacity 0.5s ease 0s;
  object-position: center center;
  // object-fit: cover;
`;

export const InfoCard = styled.div`
  padding: 20px;
  color: #ffff;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  p {
    margin: 0px;
  }
  .text-gray {
    color: rgb(158, 158, 158);
  }
`;
