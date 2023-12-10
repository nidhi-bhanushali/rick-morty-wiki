import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const StyledInput = styled.input`
  display: flex;
  align-items: center;
  position: relative;
  transition: all 0.2s;
  outline: none;
  font-size: 16px;
  padding-left: 16px;
  padding-right: 16px;
  margin: 24px auto;
  height: 38px;
  line-height: 38px;
  border-radius: 4px;
  border: 1px solid #dedede;
  background-color: ${({ backgroundColor }) =>
    backgroundColor ? backgroundColor : "#dedede"};
  width: ${({ width }) => (width ? width : 320)};
`;

const SearchInput = (props) => {
  const { placeholder, ...rest } = props;
  return <StyledInput placeholder={placeholder ?? "Search"} {...rest} />;
};

SearchInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.string,
};

export default SearchInput;
