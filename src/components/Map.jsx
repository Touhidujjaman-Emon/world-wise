import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import styles from "./Map.module.css";
import "leaflet/dist/leaflet.css";
import { useState } from "react";

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
  const [mapPosition, setMapPosition] = useState([40.7128, -74.006]); // Default position (New York City)

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        key={`${lat}-${lng}`}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={mapPosition}>
          <Popup>
            lat: {lat}, lng: {lng}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
