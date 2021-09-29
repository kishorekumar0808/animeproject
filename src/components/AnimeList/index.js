import { Component } from "react";
import { v4 } from "uuid";
import Loader from "react-loader-spinner";
import AnimeListElements from "../AnimeListElements";
import CommentsItem from "../CommentsItem";

import "./index.css";

const initialContainerBackgroundClassNames = [
  "amber",
  "blue",
  "orange",
  "emerald",
  "teal",
  "red",
  "light-blue",
];

class AnimeList extends Component {
  state = {
    isTrue: true,
    animeSubListData: [],
    username: "",
    comment: "",
    commentsList: [],
  };

  componentDidMount() {
    this.getAnimeSubData();
  }

  formattedData = (data) => ({
    id: data.id,
    bannerImage: data.banner_image,
    coverImage: data.cover_image,
    description: data.descriptions,
    genres: data.genres,
    season: data.season_period,
    episodes: data.episodes_count,
    duration: data.episode_duration,
    year: data.season_year,
    title: data.titles.en,
  });

  getAnimeSubData = async () => {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;

    const response = await fetch(`https://api.aniapi.com/v1/anime/${id}`, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjMzOCIsIm5iZiI6MTYzMjcyNjcxMSwiZXhwIjoxNjM1MzE4NzExLCJpYXQiOjE2MzI3MjY3MTF9.Hls6Ccd7LUsGrUeCzA6fTRESsNmBI_YphY_dDmC5aps",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const responseData = await response.json();
    console.log(responseData);
    const { data } = responseData;
    const format = this.formattedData(data);
    this.setState({ animeSubListData: [format], isTrue: false });
  };

  renderAnimeSubList = () => {
    const { animeSubListData } = this.state;

    return (
      <div>
        <AnimeListElements animeSubList={animeSubListData} />
        <div className="comments">{this.commentsSection()}</div>
      </div>
    );
  };

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <Loader type="BallTriangle" color="#00BFFF" height={80} width={80} />
    </div>
  );

  deleteComment = (commentId) => {
    const { commentsList } = this.state;
    this.setState({
      commentsList: commentsList.filter((comment) => comment.id !== commentId),
    });
  };

  toggleIsLiked = (id) => {
    this.setState((prevState) => ({
      commentsList: prevState.commentsList.map((eachComment) => {
        if (id === eachComment.id) {
          return { ...eachComment, isLiked: !eachComment.isLiked };
        }
        return eachComment;
      }),
    }));
  };

  renderCommentsList = () => {
    const { commentsList } = this.state;
    return commentsList.map((eachComment) => (
      <CommentsItem
        key={eachComment.id}
        commentDetails={eachComment}
        toggleIsLiked={this.toggleIsLiked}
        deleteComment={this.deleteComment}
      />
    ));
  };

  onAddComment = (event) => {
    event.preventDefault();
    const { username, comment } = this.state;

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1
        )
      ]
    }`;

    const newComment = {
      id: v4(),
      username,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    };

    this.setState((prevState) => ({
      commentsList: [...prevState.commentsList, newComment],
      username: "",
      comment: "",
    }));
  };

  onChangeComment = (event) => {
    this.setState({
      comment: event.target.value,
    });
  };

  onChangeName = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  commentsSection = () => {
    const { username, comment, commentsList, animeSubListData } = this.state;

    return (
      <div className="comments-app-container">
        <div className="comments-container">
          <h2 className="app-heading-1">Reviews</h2>
          <div className="comments-inputs">
            <form className="form" onSubmit={this.onAddComment}>
              <p className="form-description-1">
                Say Something About:{" "}
                <span className="title-name">{animeSubListData[0].title}</span>
              </p>
              <input
                type="text"
                className="name-input"
                placeholder="Your Name"
                value={username}
                onChange={this.onChangeName}
              />
              <textarea
                placeholder="Your Review"
                className="comment-input"
                value={comment}
                onChange={this.onChangeComment}
                rows="6"
              />
              <button type="submit" className="add-button">
                Add Comment
              </button>
            </form>
            <img
              className="image-comments"
              src={animeSubListData[0].coverImage}
              alt="comments"
            />
          </div>
          <hr className="line" />
          <p className="heading">
            <span className="comments-count">{commentsList.length}</span>
            Comments
          </p>
          <ul className="comments-list">{this.renderCommentsList()}</ul>
        </div>
      </div>
    );
  };

  render() {
    const { isTrue } = this.state;
    return (
      <section className="AnimeListSubELe-cont">
        <div>{isTrue ? this.renderLoader() : this.renderAnimeSubList()}</div>
      </section>
    );
  }
}

export default AnimeList;
