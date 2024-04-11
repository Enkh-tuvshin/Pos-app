import Svg, { Path } from "react-native-svg";

export const PackageImportIcon = ({ color }: { color: string }) => (
  <Svg width="33" height="33" viewBox="0 0 24 24" stroke-width="1.5" stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round">
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 21l-8 -4.5v-9l8 -4.5l8 4.5v4.5" />
    <Path d="M12 12l8 -4.5" />
    <Path d="M12 12v9" />
    <Path d="M12 12l-8 -4.5" />
    <Path d="M22 18h-7" />
    <Path d="M18 15l-3 3l3 3" />
  </Svg>
);
