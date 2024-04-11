import Svg, { Path } from "react-native-svg";

export const HistoryIcon = ({ color }: { color: string }) => (
  <Svg width="33" height="33" viewBox="0 0 24 24" stroke-width="1.5" stroke={color} fill="none" stroke-linecap="round" stroke-linejoin="round">
    <Path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <Path d="M12 8l0 4l2 2" />
    <Path d="M3.05 11a9 9 0 1 1 .5 4m-.5 5v-5h5" />
  </Svg>
);
