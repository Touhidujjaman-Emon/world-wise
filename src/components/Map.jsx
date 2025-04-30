import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L from "leaflet";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
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

  const lat = parseFloat(searchParams.get("lat"));
  const lng = parseFloat(searchParams.get("lng"));
  const [mapPosition, setMapPosition] = useState([38.72, -9.14]);
  const { cities } = useCities();

  useEffect(
    function () {
      if (lat && lng) {
        setMapPosition([lat, lng]);
      }
    },
    [lat, lng]
  );

  // Debugging cities data
  console.log("Fetched cities:", cities);

  // Guard against empty or invalid cities
  if (!cities || cities.length === 0) {
    return <div>No cities available</div>;
  }

  return (
    <div className={styles.mapContainer}>
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
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
