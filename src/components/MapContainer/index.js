import React, { useContext } from "react";
import { GoogleMap, Autocomplete, Marker } from "@react-google-maps/api";
import { styleMap } from "../../constants";
import { StoreContext } from "../../core";

const MapContainer = () => {
  const { state } = useContext(StoreContext);
  const { globalState } = state;
  const { coordinates = null } = globalState;

  return (
    <>
      {coordinates && (
        <GoogleMap
          mapContainerClassName="App-map"
          center={{ lat: coordinates?.latitude, lng: coordinates?.longitude }}
          zoom={18}
          version="weekly"
          on
          options={{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: false,
            styles: styleMap,
          }}
        >
          <Autocomplete>
            <input />
          </Autocomplete>

          <Marker
            position={{
              lat: coordinates?.latitude,
              lng: coordinates?.longitude,
            }}
            title={"Mi Ubicación"}
            animation={1}
            icon={{
              url:
                "https://firebasestorage.googleapis.com/v0/b/demorestaurant-af381.appspot.com/o/Icon%20ionic-md-pin.png?alt=media&token=0da8b78a-8f3e-4465-8577-81844b8fb911",
              size: {
                height: 31,
                width: 22,
              },
              scaledSize: {
                height: 31,
                width: 22,
              },
            }}
          />
        </GoogleMap>
      )}
    </>
  );
};
export default MapContainer;
