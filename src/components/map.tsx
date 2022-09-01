import { useRef, useState } from "react";
import Link from "next/link";
import ReactMapGL, { Marker, Popup, MapRef } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface Props {}

const Map = (props: Props) => {
	const mapRef = useRef<MapRef>(null);
	const [viewport, setViewport] = useState({
		latitude: 43,
		longitude: -79,
		zoom: 10,
	});

	return (
		<div className="text-black relative">
			<ReactMapGL
				{...viewport}
				style={{ width: "100%", height: "calc(100vh - 64px)" }}
				mapStyle="mapbox://styles/mapbox/streets-v9"
				mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
				onMove={evt => setViewport(evt.viewState)}
				ref={mapRef}
				minZoom={5}
				maxZoom={15}
			></ReactMapGL>
		</div>
	);
};

export default Map;
