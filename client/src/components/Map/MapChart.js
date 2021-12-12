import React, { memo } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography
} from "react-simple-maps";

import { MAP_META } from '../../constants';

const MapChart = ({ setTooltipVisibility, handleCountryChange }) => {

  let geoUrl = MAP_META.World.geoDataFile;

  return (
    <>
      <ComposableMap data-tip="" projectionConfig={{ scale: 200 }}>
        <ZoomableGroup zoom={1}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={() => {
                    const { NAME, ISO_A2 } = geo.properties;
                    setTooltipVisibility(true);
                    handleCountryChange(NAME, ISO_A2.toLowerCase());

                  }}
                  onMouseLeave={() => {
                    setTooltipVisibility(false);
                    // handleCountryChange('');
                  }}
                  style={{
                    default: {
                      fill: "#a7f1a7",//rgb(19, 21, 22)",
                      outline: "none",
                      stroke: "black",//"rgb(107, 109, 112)",
                      strokeOpacity: "1"
                    },
                    hover: {
                      fill: "#189a18",//"#F53",
                      outline: "none"
                    },
                    pressed: {
                      fill: "#E42",
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
