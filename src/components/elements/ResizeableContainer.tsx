import {
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewProps,
} from "react-native";

import { useResizeable } from "@/context/ResizeableContext";

import { TResizeableIds } from "@/constant/resizeable";
import { isResizeableContainerData } from "@/helper/resizeable.helper";

interface IProps extends ViewProps {
  id: TResizeableIds;
  style: TextStyle;
}

const ResizeableContainer = ({ id, ...props }: IProps) => {
  const { resizeableValues, setResizingId } = useResizeable();

  const data = resizeableValues[id];

  if (!isResizeableContainerData(data)) return <></>;

  return (
    <TouchableWithoutFeedback onPress={() => setResizingId(id)}>
      <View {...props} style={{ ...props.style, ...data }} />
    </TouchableWithoutFeedback>
  );
};

export default ResizeableContainer;
