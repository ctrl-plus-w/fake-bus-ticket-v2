import {
  StyleProp,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  Animated,
  ViewStyle,
} from "react-native";

import { useResizeable } from "@/context/ResizeableContext";

import { TResizeableContainer, TResizeableIds } from "@/constant/resizeable";
import { isResizeableContainerData } from "@/helper/resizeable.helper";

interface IProps extends ViewProps {
  id: TResizeableIds;
  style: TextStyle;
}

const ResizeableContainer = ({ id, ...viewProps }: IProps) => {
  const { isResizeMode, resizeableValues, setResizingId } = useResizeable();

  const data = resizeableValues[id];

  if (!isResizeableContainerData(data)) return <></>;

  const props = {
    ...viewProps,
    style: {
      ...viewProps.style,
      ...data,

      borderWidth: isResizeMode ? 1 : viewProps.style.borderWidth ?? 1,
      borderColor: isResizeMode
        ? "red"
        : viewProps.style.borderColor ?? "transparent",
    } as StyleProp<ViewStyle>,
  };

  return (
    <TouchableWithoutFeedback onPress={() => setResizingId(id)}>
      <View {...props} />
    </TouchableWithoutFeedback>
  );
};

export default ResizeableContainer;
