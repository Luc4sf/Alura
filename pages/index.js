import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/Timeline";
import { StyledFavorite } from "../src/components/Favorites";

function HomePage() {
  const estilosDaHomePage = {
    //backgroundColor: 'red' 
  };

  // console.log(config.playlists);
  return (
    <>
      <CSSReset />
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        // backgroundColor: "red",
      }}>
        <Menu />
        <Header />
        <Timeline playlists={config.playlists}>
        </Timeline>
        <Favorites favorites={config.favorites}>
        </Favorites>
      </div>
    </>
  );
}

export default HomePage

// function Menu() {
//   return (
//     <div>
//       Menu
//     </div>
//   )
// }

const StyledHeader = styled.div`
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
  .banner {
    border-radius: 0%;
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: 0% 60%;
  }
`;
function Header() {
  return (
    <StyledHeader>
      {<img className="banner" src="https://images.unsplash.com/photo-1611996575749-79a3a250f948?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" />}
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

function Timeline(propriedades) {
  // console.log("Dentro do componente", props.playlists );
  const playlistNames = Object.keys(propriedades.playlists);
  // statement (for(i in aksdams) normal)
  // retorno por expressao (react)
  return (
    <StyledTimeline>
      {playlistNames.map((playlistName) => {
        const videos = propriedades.playlists[playlistName];
        //console.log(playlistName);
        //console.log(videos);
        return (
          <section>
            <h2>{playlistName}</h2>
            <div>
              {videos.map((video) => {
                return (
                  <a href={video.url}>
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
          <section>
            <h2>{favoritesName}</h2>
            <div>
              {youtubers.map((youtuber) => {
                return (
                  <a href={youtuber.url}>
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
