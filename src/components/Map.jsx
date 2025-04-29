import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { useCities } from "../Contexts/CitiesContext";

// Import marker images as ES modules
import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

// Override Leaflet’s default icon options
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function Map() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const lat = parseFloat(searchParams.get("lat")) || 0;
  const lng = parseFloat(searchParams.get("lng")) || 0;
  const [mapPosition, setMapPosition] = useState([lat || 40.7128, lng || 0]);
  const { cities } = useCities();

  // Debugging cities data
  console.log("Fetched cities:", cities);

  // Guard against empty or invalid cities
  if (!cities || cities.length === 0) {
    return <div>No cities available</div>;
  }

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        className={styles.map}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => {
          if (!city || !city.position) {
            console.warn(`Invalid city data:`, city);
            return null;
          }
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                {city.emoji} {city.cityName}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
