import { Text, TextProps, TextStyle } from "react-native";

import { useResizeable } from "@/context/ResizeableContext";

import { TResizeableIds } from "@/constant/resizeable";
import { isResizeableTextData } from "@/helper/resizeable.helper";

interface IProps extends TextProps {
  id: TResizeableIds;
  style: TextStyle;
}

const ResizeableText = ({ id, ...props }: IProps) => {
  const { resizeableValues, setResizingId } = useResizeable();

  const data = resizeableValues[id];

  if (!isResizeableTextData(data)) return <></>;

  return (
    <Text
      {...props}
      style={{ ...props.style, fontSize: data.fontSize }}
      onPress={() => setResizingId(id)}
    />
  );
};

export default ResizeableText;
