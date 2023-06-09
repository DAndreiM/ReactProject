import classes from "./BerryDetail.module.css";
import { useGetBerryDetailQuery } from "../../../services/pokemon";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import QueryDataWrapper from "../../../ui/QueryDataWrapper";

const BerryDetail = () => {
  const params = useParams();
  const { data, error, isLoading } = useGetBerryDetailQuery(
    `${params.berryID}`
  );

  return (
    <QueryDataWrapper isLoading={isLoading} error={error}>
      <div className={classes.berryDetail}>
        <h1 className={classes.berryTitle}>{data?.item.name.toUpperCase()}</h1>
        <div className={classes.berryChara}>
          <div className={classes.berryCharaCategory}>
            <div>
              <p>Firmness (Link)</p>
              <p>
                <Link
                  className={classes.pageLink}
                  to={`firmness/${data?.firmness.name}`}
                >{`${data?.firmness.name.toUpperCase()} `}</Link>
              </p>
            </div>
            <div>
              <p>Growth time</p>
              <p>{data?.growth_time}</p>
            </div>
            <div>
              <p>Soil dryness</p>
              <p>{data?.soil_dryness}</p>
            </div>
          </div>
          <div className={classes.berryCharaCategory}>
            <div>
              <p>Natural gift power</p>
              <p>{data?.natural_gift_power}</p>
            </div>
            <div>
              <p>Natural gift type</p>
              <p>{data?.natural_gift_type.name.toUpperCase()}</p>
            </div>
          </div>
          <div className={classes.berryCharaCategory}>
            <div>
              <p>Max Harvest</p>
              <p>{data?.max_harvest}</p>
            </div>
            <div>
              <p>Smoothness</p>
              <p>{data?.smoothness}</p>
            </div>
            <div>
              <p>Size</p>
              <p>{data?.size}</p>
            </div>
          </div>
          <div className={classes.flavour}>
            <p>Flavours (Link)</p>
            <p>
              {data?.flavors.map((item) => (
                <Link
                  className={classes.pageLink}
                  key={item.flavor.name}
                  to={`flavor/${item.flavor.name}`}
                >
                  {`${item.flavor.name.toUpperCase()}`}
                </Link>
              ))}
            </p>
          </div>
          <Link className={classes.backLink} to={".."}>
            Back
          </Link>
        </div>
      </div>
    </QueryDataWrapper>
  );
};

export default BerryDetail;
