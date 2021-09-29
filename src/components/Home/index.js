import { Component } from "react";
import HomeCartElement from "../HomeCartElement";
import Loader from "react-loader-spinner";
import "./index.css";

class Home extends Component {
  state = { isTrue: true, animeList: [], searchInput: "" };

  onSearchInput = (event) => {
    this.setState({ searchInput: event.target.value });
  };

  componentDidMount() {
    this.getAnimeList();
  }

  getAnimeList = async () => {
    const response = await fetch("https://api.aniapi.com/v1/anime", {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzOCIsIm5iZiI6MTYzMjcyNjcxMSwiZXhwIjoxNjM1MzE4NzExLCJpYXQiOjE2MzI3MjY3MTF9.Hls6Ccd7LUsGrUeCzA6fTRESsNmBI_YphY_dDmC5aps",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const responseData = await response.json();
    const formattedData = responseData.data.documents.map((eachItem) => ({
      title: eachItem.titles.en,
      id: eachItem.id,
      CoverImg: eachItem.cover_image,
    }));
    this.setState({ animeList: formattedData, isTrue: false });
  };

  renderAnimeList = () => {
    const { animeList, searchInput } = this.state;
    const result = animeList.filter((eachItem) =>
      eachItem.title.toLowerCase().includes(searchInput.toLowerCase())
    );

    return (
      <ul className="teams-list">
        {result.map((eachData) => (
          <HomeCartElement key={eachData.id} listItems={eachData} />
        ))}
      </ul>
    );
  };

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  );
  
  render() {
    const { isTrue, searchInput } = this.state;

    return (
      <section className="bg-container">
        <div className="main-container">
          <nav className="nav-bar">
            <h1 className="title">
              ANI<span className="span-ele">ME</span>
            </h1>
            <div className="search-bar-container">
              <input
                type="search"
                className="input-search"
                onChange={this.onSearchInput}
                value={searchInput}
              />
              <img
                alt="search icon"
                className="search-icon"
                src="https://assets.ccbp.in/frontend/react-js/google-search-icon.png"
              />
            </div>
          </nav>
        </div>

        <div className="body-container">
          {isTrue ? this.renderLoader() : this.renderAnimeList()}
        </div>
      </section>
    );
  }
}

export default Home;
