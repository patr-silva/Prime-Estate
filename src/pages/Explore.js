import { Link } from "react-router-dom";
import Slider from "../components/Slider";

import rentCategoryImage from "../assets/jpg/rentCategoryImage.jpg";
import sellCategoryImage from "../assets/jpg/sellCategoryImage.jpg";
import classes from "./Explore.module.css";

const Explore = () => {
  return (
    <div className={classes.explore}>
      <header>
        <Link to='/'>
          <p className={classes.header}>Prime Estate</p>
        </Link>
      </header>
      <main>
        <Slider />
        <p className={classes.heading}>Categories</p>
        <div className={classes.categories}>
          <Link to='/category/rent'>
            <p>Places for rent</p>
            <img src={rentCategoryImage} alt='rent' className={classes.img} />
          </Link>
          <Link to='/category/sale'>
            <p>Places for sale</p>
            <img src={sellCategoryImage} alt='sell' className={classes.img} />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Explore;
