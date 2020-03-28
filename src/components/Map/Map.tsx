import React, { useState, FC } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({text}: any) => <div>{text}</div>;

export const Map: FC = () => {
    const [center, setCenter] = useState({lat: 11.0168, lng: 76.9558 });
    const [zoom, setZoom] = useState(11);
    return (
        <div style={{ height: "calc(100vh - 75px)", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC9gDrlmDlNXVGpjLIFRV3WbrMD5z1Wi0o" }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={11.0168}
            lng={76.9558}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
}