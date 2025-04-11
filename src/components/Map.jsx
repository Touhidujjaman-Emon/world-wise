import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = searchParams.get("lat") || 0;
  const lng = searchParams.get("lng") || 0;
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        lat: {lat}, lng:{lng}
      </h1>
    </div>
  );
}

export default Map;
