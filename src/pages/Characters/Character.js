import React from "react";
import PropTypes from "prop-types";
import { CharacterCard, InfoCard, StyledImage } from "./Characters";
import useDeviceDimensions from "../../hooks/useDeviceDimensions";
import { useNavigate } from "react-router";

const Character = ({ character }) => {
  const { isMobile } = useDeviceDimensions();
  const navigate = useNavigate();

  return (
    <CharacterCard
      isMobile={isMobile}
      onClick={() => navigate(`character/${character.id}`)}
    >
      <div style={{ width: !isMobile && "35%", height: !isMobile && "100%" }}>
        <StyledImage src={character.image} alt={character.name} />
      </div>
      <InfoCard>
        <div>
          <h2 style={{ margin: 0 }}>{character.name}</h2>
          <p className="margin-top">
            {character.status} - {character.species}
          </p>
        </div>
        <div>
          <span className="text-gray">Last known location:</span>
          <p className="margin-top">{character.location.name}</p>
        </div>
        <div>
          <span className="text-gray">Origin:</span>
          <p className="margin-top">{character.origin.name}</p>
        </div>
      </InfoCard>
    </CharacterCard>
  );
};

Character.propTypes = {
  character: PropTypes.object.isRequired,
};

export default Character;
