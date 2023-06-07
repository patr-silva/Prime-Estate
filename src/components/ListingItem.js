import { Link } from "react-router-dom";
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg";
import { ReactComponent as EditIcon } from "../assets/svg/editIcon.svg";
import bedIcon from "../assets/svg/bedIcon.svg";
import bathtubIcon from "../assets/svg/bathtubIcon.svg";

import classes from "./ListingItem.module.css";

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className={classes.category}>
      <Link to={`/category/${listing.type}/${id}`} className={classes.link}>
        <img
          src={listing.imageUrls[0]}
          alt={listing.name}
          className={classes.img}
        />
        <div className={classes.details}>
          <p className={classes.location}>{listing.location}</p>
          <p className={classes.name}>{listing.name}</p>

          <p className={classes.price}>
            $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" && " / Month"}
          </p>
          <div className={classes.info}>
            <img src={bedIcon} alt='bed' />
            <p className={classes.text}>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : "1 Bedroom"}
            </p>
            <img src={bathtubIcon} alt='bath' />
            <p className={classes.text}>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : "1 Bathroom"}
            </p>
          </div>
        </div>
      </Link>

      {onDelete && (
        <DeleteIcon
          className={classes.remove}
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && (
        <EditIcon className={classes.edit} onClick={() => onEdit(id)} />
      )}
    </li>
  );
}

export default ListingItem;
