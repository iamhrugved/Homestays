import { Link } from "react-router-dom";
import "./searchItem.css";
import useFetch from "../../hooks/useFetch";

const SearchItem = ({ item }) => {
  // console.log(item)
  // const { data, loading, error, reFetch } = useFetch(
  //   `/hotels/minPrice/${item._id}`
  // );
  // console.log(data)
  return (
    <div className="searchItem">
      <img src={item.photos} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siDistance">{item.location}</span>
        <span className="siSubtitle">
          {item.description}
        </span>
        <span className="siFeatures">Enjoy our delicious meals and other ameinites at negligible extra cost</span>
        <span className="siCancelOp">Free cancellation </span>
        <span className="siCancelOpSubtitle">
          You can cancel later, so lock in this great price today!
        </span>
      </div>
      <div className="siDetails">
        
        <div className="siDetailTexts">
        <span className="siTaxOp">starts from</span>
        <span className="siPrice">${item.basePrice}</span>
        <span className="siTaxOp">Includes taxes and fees</span>
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">See availability</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
