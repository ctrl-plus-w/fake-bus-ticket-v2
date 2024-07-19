import { resizeableChildStyle, TResizeableText } from "@/constant/resizeable";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { XIcon } from "lucide-react-native";
import Slider from "@react-native-community/slider";
import { IResizeableModalChildProps } from "../../types/resizeable";

const ResizeableModalText = ({
  id,

  defaultValue,

  value,
  setValue,

  submit,
  close,
}: IResizeableModalChildProps<TResizeableText>) => {
  const onValueChange = (fontSize: number) => {
    setValue({ ...value, fontSize });
  };

  return (
    <View style={resizeableChildStyle.container}>
      <View style={resizeableChildStyle.header}>
        <Text>
          {id} (default: {defaultValue.fontSize})
        </Text>

        <TouchableOpacity onPress={close}>
          <XIcon />
        </TouchableOpacity>
      </View>

      <Text>{value.fontSize}</Text>

      <Slider
        style={{ width: "100%" }}
        minimumValue={8}
        maximumValue={32}
        step={1}
        value={value.fontSize}
        onValueChange={onValueChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />

      <Button title="Modifier" onPress={submit} />
    </View>
  );
};

export default ResizeableModalText;
