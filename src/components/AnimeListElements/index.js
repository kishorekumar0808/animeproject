import "./index.css";

const AnimeListElements = (props) => {
  const { animeSubList } = props;
  const [format] = animeSubList;

  return (
    <section className="AnimeListElements-container">
      <img src={format.bannerImage} alt="bannerImage" className="bannerLogo" />

      <div className="cart-container">
        <div className="description-container">
          <img src={format.coverImage} alt="coverImage" className="image" />

          <div className="info-container">
            <p>
              <span className="span-title">Title</span>: {format.title}
            </p>
            <p className="description">
              <span className="span-title">Description</span>:{" "}
              {format.description.en}
            </p>
            <p className="genres">
              <span className="span-title">Genres</span>: {format.genres}
            </p>
            <p>
              <span className="span-title">Season</span>: {format.season}
            </p>
            <p>
              <span className="span-title">Episodes</span>: {format.episodes}
            </p>
            <p>
              <span className="span-title">Duration</span>: {format.duration}
            </p>
            <p>
              <span className="span-title">Year</span>: {format.year}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AnimeListElements;