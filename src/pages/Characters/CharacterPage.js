import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import spinningGif from "../../assets/spinner.gif";
import useDeviceDimensions from "../../hooks/useDeviceDimensions";
import { StyledImage } from "./Characters";
import { useParams } from "react-router";
import { episodesContext } from "../../App";

const StyledMainContainer = styled.div`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? "column" : "row")};
  column-gap: 100px;
  row-gap: 20px;
  background: #272b33;
  justify-content: center;
  align-items: ${({ isMobile }) => (isMobile ? "center" : "flex-start")};
  padding: 50px 0px;
  color: #ffff;
  && h5 {
    font-weight: 400;
    margin-bottom: 8px;
    margin: 0px;
  }
  p {
    font-size: 12px;
    color: rgb(136 153 184);
    text-transform: uppercase;
    margin: 0px;
  }
  h3 {
    margin: 0px;
  }
`;

const CharacterContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 8px;
  margin: 20px 0px;
`;

const EpisodesContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  .margin-0 {
    margin: 0px;
  }
  && h5 {
    font-weight: 400;
    margin-bottom: 8px;
  }
  p {
    font-size: 12px;
    color: rgb(136 153 184);
    text-transform: uppercase;
  }
`;

const CharacterPage = () => {
  const { episodes, setAllEpisodes } = useContext(episodesContext);
  const [character, setCharacter] = useState({});
  const [origin, setOrigin] = useState();
  const [currentLocation, setCurrentLocation] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();

  const [characterEpisodes, setCharacterEpisodes] = useState([]);

  const fetchEpisodes = async (episodesUrls) => {
    const episodeIds = episodesUrls.map(
      (episode) => episode.split("episode/")[1]
    );

    const newEpisodes = episodeIds.filter(
      (epi) =>
        !episodes.find((episode) => {
          return episode.id === +epi;
        })
    );

    const existingEpisodes = episodes.filter((epi) => {
      return episodeIds.includes(`${epi.id}`);
    });
    setCharacterEpisodes([...existingEpisodes]);

    if (newEpisodes.length > 0) {
      const episodesArr = await fetch(
        `https://rickandmortyapi.com/api/episode/${newEpisodes}`
      ).then((res) => res.json());

      if (Array.isArray(episodesArr)) {
        setAllEpisodes([...episodes, ...episodesArr]);
        setCharacterEpisodes((prev) => [...prev, ...episodesArr]);
        return;
      }
      setAllEpisodes([...episodes, episodesArr]);
      setCharacterEpisodes((prev) => [...prev, episodesArr]);
    }
  };

  const fetchOrigin = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setOrigin(data);
  };

  const fetchCurrentLocation = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setCurrentLocation(data);
  };

  const fetchCharacterInfo = async (id) => {
    const url = `https://rickandmortyapi.com/api/character/${id}`;
    setIsLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setCharacter(data ?? {});
    fetchEpisodes(data.episode);
    fetchOrigin(data.origin.url);
    fetchCurrentLocation(data.location.url);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCharacterInfo(params.id);
  }, [params.id]);

  const { isMobile } = useDeviceDimensions();

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Character Info</h1>
      {isLoading ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80vh",
          }}
        >
          <img alt="Saving" src={spinningGif} height={120} width={120} />
        </div>
      ) : (
        <StyledMainContainer isMobile={isMobile}>
          <div>
            <div style={{ height: 300, width: 300 }}>
              <StyledImage src={character.image} />
            </div>
            <CharacterContainer>
              <h3>{character.name}</h3>
              <span>Status: {character.status}</span>
              <span>Species: {character.species}</span>
              <span>Gender: {character.gender}</span>
            </CharacterContainer>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 8,
                margin: "20px 0px",
              }}
            >
              <h3>Origin Details</h3>
              <h5>Name: {origin?.name}</h5>
              <p>Dimension: {origin?.dimension}</p>
              <p>Residents: {origin?.residents?.length}</p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: 8,
                margin: "20px 0px",
              }}
            >
              <h3>Current Location Details</h3>
              <h5>Name: {currentLocation?.name}</h5>
              <p>Dimension: {currentLocation?.dimension}</p>
              <p>Residents: {currentLocation?.residents?.length}</p>
            </div>
          </div>
          <EpisodesContainer>
            <h3 className="margin-0">FEATURED IN</h3>
            {characterEpisodes?.map((episode) => {
              return (
                <div key={episode.id}>
                  <h5 className="margin-0">
                    {episode.episode} - {episode.name}
                  </h5>
                  <p className="margin-0">{episode.air_date}</p>
                </div>
              );
            })}
          </EpisodesContainer>
        </StyledMainContainer>
      )}
    </>
  );
};

CharacterPage.propTypes = {
  character: PropTypes.object.isRequired,
};

export default CharacterPage;
