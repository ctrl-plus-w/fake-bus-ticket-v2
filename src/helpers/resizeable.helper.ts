import AsyncStorage from "@react-native-async-storage/async-storage";

import RESIZEABLE, {
  ResizeableContainerSchema,
  ResizeableSchema,
  ResizeableTextSchema,
  TResizeableContainer,
  TResizeableData,
  TResizeableIds,
  TResizeableText,
} from "@/constant/resizeable";
import { ZodSchema } from "zod";

export const getResizeableValue = async (
  id: TResizeableIds,
): Promise<TResizeableData> => {
  const defaultValue = RESIZEABLE[id];

  try {
    const value = await AsyncStorage.getItem(id);
    if (!value) throw new Error();

    return ResizeableSchema.parse(JSON.parse(value));
  } catch (error) {
    return defaultValue;
  }
};

export const isSchemaType = <T>(schema: ZodSchema) => {
  return (data: unknown): data is T => {
    try {
      schema.parse(data);

      return true;
    } catch (_) {
      return false;
    }
  };
};

export const isResizeableTextData =
  isSchemaType<TResizeableText>(ResizeableTextSchema);

export const isResizeableContainerData = isSchemaType<TResizeableContainer>(
  ResizeableContainerSchema,
);
