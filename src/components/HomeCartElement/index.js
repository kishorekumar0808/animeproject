import { Link } from "react-router-dom";
import "./index.css";

const HomeCartElement = (props) => {
  const { listItems } = props;
  const { title, CoverImg, id } = listItems;
  return (
    <li>
      <Link to={`/anime-List/${id}`} className="link">
        <img src={CoverImg} alt="title" className="logo" />
        <h3>{title}</h3>
      </Link>
    </li>
  );
};

export default HomeCartElement;
