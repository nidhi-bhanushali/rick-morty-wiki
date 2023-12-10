import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import SearchInput from "../../components/SearchInput";

const genderOptions = ["Select", "female", "male", "genderless", "unknown"];

const statusOptions = ["Select", "alive", "dead", "unknown"];

const StyledSelect = styled.select`
  height: 40px;
  width: 200px;
  border: 1px solid #dedede;
  display: flex;
  border-radius: 4px;
`;

const StyledContainer = styled.div`
  margin: 20px;
  display: grid;
  row-gap: 12px;
  justify-content: center;
  column-gap: 12px;
  grid-template-columns: repeat(auto-fill, 200px);
`;

const StyledSearchInput = styled(SearchInput)`
  margin: 0px;
`;

const Filters = (props) => {
  const handleGenderChange = (e) => {
    if (e.target.value === "Select") {
      props.updateGender("");
      return;
    }
    props.updateGender(e.target.value);
  };

  const handleStatusChange = (e) => {
    if (e.target.value === "Select") {
      props.updateStatus("");
      return;
    }
    props.updateStatus(e.target.value);
  };

  const handleSpeciesChange = (e) => {
    props.updateSpecies(e.target.value);
  };

  return (
    <StyledContainer>
      <StyledSelect
        value={props.gender}
        name="select"
        onChange={handleGenderChange}
      >
        {genderOptions.map((opt) => {
          return (
            <option value={opt} selected={props.gender === opt} key={opt}>
              {opt}
            </option>
          );
        })}
      </StyledSelect>
      <StyledSelect
        value={props.status}
        name="select"
        onChange={handleStatusChange}
      >
        {statusOptions.map((opt) => {
          return (
            <option value={opt} selected={props.status === opt} key={opt}>
              {opt}
            </option>
          );
        })}
      </StyledSelect>

      <StyledSearchInput
        value={props.species}
        onChange={handleSpeciesChange}
        placeholder="Search species"
        backgroundColor="#ffff"
        width="200px"
      />
    </StyledContainer>
  );
};

Filters.propTypes = {
  gender: PropTypes.string.isRequired,
  updateGender: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired,
  updateSpecies: PropTypes.func.isRequired,
  species: PropTypes.string.isRequired,
};

export default Filters;
