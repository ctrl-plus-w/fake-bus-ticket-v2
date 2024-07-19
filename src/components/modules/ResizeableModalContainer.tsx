import {
  resizeableChildStyle,
  TResizeableContainer,
} from "@/constant/resizeable";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { XIcon } from "lucide-react-native";
import Slider from "@react-native-community/slider";
import { IResizeableModalChildProps } from "@/type/resizeable";

interface IProps {
  min: number;
  max: number;

  value: TResizeableContainer;
  onValueChange: (p: keyof TResizeableContainer) => (v: number) => void;

  property: keyof NumberProperties<TResizeableContainer>;

  style?: StyleProp<ViewStyle>;
}

const ValueEditor = ({
  style,
  onValueChange,
  min,
  max,
  value,
  property,
}: IProps) => {
  return (
    <View
      style={[
        {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
        },
        style,
      ]}
    >
      <Text>
        {property}: {value[property]}
      </Text>

      <Slider
        style={{ width: "100%" }}
        minimumValue={min}
        maximumValue={max}
        step={1}
        value={value[property]}
        onValueChange={onValueChange(property)}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </View>
  );
};

const ResizeableModalText = ({
  id,

  defaultValue,

  value,
  setValue,

  submit,
  close,
}: IResizeableModalChildProps<TResizeableContainer>) => {
  const deviceWidth = Dimensions.get("window").width;
  const deviceHeight = Dimensions.get("window").height;

  const onValueChange = (property: keyof TResizeableContainer) => {
    return (_value: number) => {
      setValue({ ...value, [property]: _value });
    };
  };

  return (
    <View style={resizeableChildStyle.container}>
      <View style={resizeableChildStyle.header}>
        <Text>{id}</Text>

        <TouchableOpacity onPress={close}>
          <XIcon />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ width: "100%" }}>
        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          <ValueEditor
            min={1}
            max={deviceWidth}
            value={value}
            onValueChange={onValueChange}
            property="width"
          />

          <ValueEditor
            min={1}
            max={deviceHeight}
            value={value}
            onValueChange={onValueChange}
            property="height"
          />
        </View>

        <ValueEditor
          min={0}
          max={deviceHeight}
          value={value}
          onValueChange={onValueChange}
          property="top"
          style={{ width: "100%" }}
        />

        <Button title="Modifier" onPress={submit} />
      </ScrollView>
    </View>
  );
};

export default ResizeableModalText;
