import {
  Button,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { XIcon } from "lucide-react-native";
import Slider from "@react-native-community/slider";
import RESIZEABLE, {
  TResizeableIds,
  TResizeableData,
  TResizeable,
  ResizeableType,
  TResizeableText,
} from "@/constant/resizeable";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  getResizeableValue,
  isResizeableContainerData,
  isResizeableTextData,
} from "@/helper/resizeable.helper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ResizeableModalText from "@/module/ResizeableModalText";
import ResizeableContainer from "@/element/ResizeableContainer";
import ResizeableModalContainer from "@/module/ResizeableModalContainer";

interface IProps {
  resizeableValues: TResizeable;
  setResizeableValues: Dispatch<SetStateAction<TResizeable>>;

  resizingId: TResizeableIds | undefined;
  setResizingId: Dispatch<SetStateAction<TResizeableIds | undefined>>;
}

const ResizeableModal = ({
  resizeableValues,
  setResizeableValues,

  resizingId,
  setResizingId,
}: IProps) => {
  const [value, setValue] = useState<TResizeableData | undefined>();

  useEffect(() => {
    if (!resizingId) return;

    getResizeableValue(resizingId).then(setValue);
  }, [resizingId]);

  useEffect(() => {
    if (!resizingId || !value) return;

    setResizeableValues((prev) => ({
      ...prev,
      [resizingId]: value,
    }));
  }, [value]);

  const close = async () => {
    if (!resizingId) return;

    await getResizeableValue(resizingId).then(setValue);

    setResizingId(undefined);
  };

  const submit = async () => {
    if (!resizingId || !value) return;

    await AsyncStorage.setItem(resizingId, value.toString());

    setResizingId(undefined);
  };

  const children = useMemo(() => {
    if (!value || !resizingId) return <></>;

    const id = resizingId;
    const defaultValue = RESIZEABLE[resizingId];

    const props = { setValue, id, submit, close };

    if (isResizeableTextData(value) && isResizeableTextData(defaultValue))
      return <ResizeableModalText {...{ ...props, value, defaultValue }} />;

    if (
      isResizeableContainerData(value) &&
      isResizeableContainerData(defaultValue)
    )
      return (
        <ResizeableModalContainer {...{ ...props, value, defaultValue }} />
      );
  }, [value, setValue, resizingId]);

  return (
    <Modal animationType="slide" transparent={true} visible={!!resizingId}>
      {children}
    </Modal>
  );
};

export default ResizeableModal;
