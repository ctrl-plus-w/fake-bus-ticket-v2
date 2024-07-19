import {
  resizeableChildStyle,
  TResizeableContainer,
} from "@/constant/resizeable";
import {
  Button,
  Dimensions,
  ScrollView,
  StyleProp,
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

  property: keyof NumberOrUndefinedProperties<TResizeableContainer>;

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
          {defaultValue.width !== undefined && (
            <ValueEditor
              min={1}
              max={deviceWidth}
              value={value}
              onValueChange={onValueChange}
              property="width"
            />
          )}

          {defaultValue.height !== undefined && (
            <ValueEditor
              min={1}
              max={deviceHeight}
              value={value}
              onValueChange={onValueChange}
              property="height"
            />
          )}
        </View>

        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          {defaultValue.top !== undefined && (
            <ValueEditor
              min={0}
              max={deviceHeight}
              value={value}
              onValueChange={onValueChange}
              property="top"
              style={{ width: "100%" }}
            />
          )}

          {defaultValue.bottom !== undefined && (
            <ValueEditor
              min={0}
              max={deviceHeight}
              value={value}
              onValueChange={onValueChange}
              property="bottom"
              style={{ width: "100%" }}
            />
          )}
        </View>

        <View style={{ display: "flex", flexDirection: "row", width: "100%" }}>
          {defaultValue.paddingVertical !== undefined && (
            <ValueEditor
              min={0}
              max={deviceHeight}
              value={value}
              onValueChange={onValueChange}
              property="paddingVertical"
              style={{ width: "100%" }}
            />
          )}

          {defaultValue.paddingHorizontal !== undefined && (
            <ValueEditor
              min={0}
              max={deviceHeight}
              value={value}
              onValueChange={onValueChange}
              property="paddingHorizontal"
              style={{ width: "100%" }}
            />
          )}
        </View>

        <Button title="Modifier" onPress={submit} />
      </ScrollView>
    </View>
  );
};

export default ResizeableModalText;
