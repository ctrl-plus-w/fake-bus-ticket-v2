import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Animated } from "react-native";
import RESIZEABLE, { TResizeable, TResizeableIds } from "@/constant/resizeable";
import ResizeableModal from "@/module/ResizeableModal";
import { getResizeableValue } from "@/helper/resizeable.helper";

interface IContext {
  isResizeMode: boolean;
  setIsResizeMode: Dispatch<SetStateAction<boolean>>;

  resizeableValues: TResizeable;
  refreshResizeableValues: () => Promise<void>;

  resizingId: TResizeableIds | undefined;
  setResizingId: Dispatch<SetStateAction<TResizeableIds | undefined>>;
}

const defaultContext = {
  isResizeMode: false,
  setIsResizeMode: () => null,

  resizeableValues: RESIZEABLE,
  refreshResizeableValues: async () => undefined,

  resizingId: undefined,
  setResizingId: () => null,
} satisfies IContext;

export const ResizeableContext = createContext<IContext>(defaultContext);

export const useResizeable = () => useContext(ResizeableContext);

export const useTicketPageAnimation = () => {
  const { resizingId } = useResizeable();

  const scaleAnimate = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const toValue = resizingId ? 0 : 1;

    Animated.timing(scaleAnimate, {
      toValue: toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [resizingId]);

  return {
    top: scaleAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: ["7%", "0%"],
    }),

    transform: [
      {
        scale: scaleAnimate.interpolate({
          inputRange: [0, 1],
          outputRange: [0.65, 1],
        }),
      },
    ],

    borderRadius: scaleAnimate.interpolate({
      inputRange: [0, 1],
      outputRange: [12, 0],
    }),
  };
};

interface IProps {
  children?: ReactNode;
}

const ResizeableProvider = ({ children }: IProps) => {
  const [isResizeMode, setIsResizeMode] = useState<boolean>(
    defaultContext.isResizeMode,
  );

  const [resizeableValues, setResizeableValues] = useState<TResizeable>(
    defaultContext.resizeableValues,
  );

  const [resizingId, setResizingId] = useState<TResizeableIds | undefined>(
    defaultContext.resizingId,
  );

  const refreshResizeableValues = async () => {
    const newValues: TResizeable = { ...RESIZEABLE };

    for (const id of Object.keys(RESIZEABLE)) {
      newValues[id] = await getResizeableValue(id);
    }

    setResizeableValues(newValues);
  };

  useEffect(() => {
    refreshResizeableValues().then();
  }, []);

  return (
    <ResizeableContext.Provider
      value={{
        isResizeMode,
        setIsResizeMode,

        resizeableValues,
        refreshResizeableValues,

        resizingId,
        setResizingId,
      }}
    >
      <ResizeableModal
        {...{
          resizeableValues,
          setResizeableValues,

          resizingId,
          setResizingId,
        }}
      />

      {children}
    </ResizeableContext.Provider>
  );
};

export default ResizeableProvider;
