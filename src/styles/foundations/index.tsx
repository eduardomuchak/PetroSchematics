import blur from "./blur";
import borders from "./borders";
import colors from "./colors";
import radius from "./radius";
import shadows from "./shadows";
import sizes from "./sizes";
import spacing from "./spacing";
import transition from "./transition";
import zindexes from "./z-index";
import typography from "./typography";

const foundations = {
  blur,
  borders,
  colors,
  radius,
  shadows,
  sizes,
  space: spacing,
  transition,
  zindexes,
  ...typography,
};

export default foundations;
