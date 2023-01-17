import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorite } from "../src/components/Favorites";

function HomePage() {

  const [valorDoFiltro, setValorDoFiltro] = React.useState("");
  
  return (
    <>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        {/* Prop Drilling */}
        <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
        <Header />
        <Timeline searchValue={valorDoFiltro} playlists={config.playlists}>
        </Timeline>
        <Favorites favorites={config.favorites}>
        </Favorites>
      </div>
    </>
  );
}

export default HomePage

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};
  
  img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`;
const StyledBanner = styled.div`
  background-image: url(${({ bg }) => bg});
  /* background-image: url(${config.bg}); */
  background-repeat: no-repeat;
  background-position: 0% 60%;
  background-size: 100%;
  height: 230px;
`;
function Header() {
  return (
    <StyledHeader>
      <StyledBanner bg={config.bg} />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`} />
        <div>
          <h2>
            {config.name}
          </h2>
          <p>
            {config.job}
          </p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ searchValue, ...propriedades }) {
  // console.log("Dentro do componente", props.playlists );
  const playlistNames = Object.keys(propriedades.playlists);
  // statement (for(i in something) normal)
  // retorno por expressao (react)
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        //console.log(playlistName);
        //console.log(videos);
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos.filter((video) => {
                const titleNormalized = video.title.toLowerCase();
                const searchValueNormalized = searchValue.toLowerCase();
                return titleNormalized.includes(searchValueNormalized)
              }).map((video) => {
                return (
                  <a key={video.url} href={video.url}>
                    <img src={video.thumb} />
                    <span>
                      {video.title}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

function Favorites(propriedades) {
  const favoritesNames = Object.keys(propriedades.favorites);
  return (
    <StyledFavorite>
      {favoritesNames.map((favoritesName) => {
        const youtubers = propriedades.favorites[favoritesName];
        return (
          <section key={favoritesName}>
            <h2>{favoritesName}</h2>
            <div>
              {youtubers.map((youtuber) => {
                return (
                  <a key={youtuber.url} href={youtuber.url}>
                    <img src={youtuber.thumb} />
                    <span>
                      {youtuber.user}
                    </span>
                  </a>
                )
              })}
            </div>
          </section>
        )
      })}
    </StyledFavorite>
  )
}
