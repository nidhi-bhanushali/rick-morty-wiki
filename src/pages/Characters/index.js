import React, { useEffect, useState } from "react";
import { StyledGridContainer, StyledHeading } from "./Characters";
import InfiniteScroll from "react-infinite-scroll-component";
import Character from "./Character";
import useDeviceDimensions from "../../hooks/useDeviceDimensions";
import SearchInput from "../../components/SearchInput";
import Filters from "./Filters";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { isMobile } = useDeviceDimensions();
  const [status, updateStatus] = useState("");
  const [gender, updateGender] = useState("");
  const [species, updateSpecies] = useState("");
  const [page, setPageNumber] = useState(1);
  const [next, setNext] = useState("");
  const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${search}&status=${status}&gender=${gender}&species=${species}`;

  const getAllCharacters = async () => {
    setIsLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setCharacters(data?.results ?? []);
    setNext(data.info?.next ?? "");
    setIsLoading(false);
  };

  const getNextPageCharacters = async (url) => {
    setIsLoading(true);
    const res = await fetch(url);
    const data = await res.json();
    setCharacters([...characters, ...(data.results ?? [])]);
    setNext(data.info?.next ?? "");
    setIsLoading(false);
  };

  useEffect(() => {
    getAllCharacters();
  }, [url]);

  return (
    <div>
      <StyledHeading>Rick and Morty Characters</StyledHeading>
      <SearchInput
        onChange={(e) => {
          setSearch(e.target.value);
          setPageNumber(1);
        }}
        value={search}
        type="text"
        width="320px"
      />
      <Filters
        pageNumber={page}
        status={status}
        updateStatus={updateStatus}
        updateGender={updateGender}
        updateSpecies={updateSpecies}
        updatePageNumber={setPageNumber}
        gender={gender}
        species={species}
      />
      <StyledGridContainer id="'scrollableDiv'" isMobile={isMobile}>
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={characters.length ?? 0}
          next={() => getNextPageCharacters(next)}
          hasMore
          loader={null}
        >
          {console.log(characters.length, isLoading)}
          {characters.length < 1 && !isLoading && (
            <div style={{ height: "calc(100vh - 200px)", color: "#ffff" }}>
              No results found
            </div>
          )}
          {characters.map((character) => (
            <Character key={character.id} character={character} />
          ))}
        </InfiniteScroll>
      </StyledGridContainer>
    </div>
  );
};

export default Characters;
