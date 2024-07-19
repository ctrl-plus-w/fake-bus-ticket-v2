import { z } from "zod";
import { StyleSheet } from "react-native";

export enum ResizeableType {
  "TEXT" = "TEXT",
  "CONTAINER" = "CONTAINER",
}

export const ResizeableTextSchema = z.object({
  type: z.literal(ResizeableType.TEXT),
  fontSize: z.number().positive(),
});

export type TResizeableText = z.infer<typeof ResizeableTextSchema>;

export const ResizeableContainerSchema = z.object({
  type: z.literal(ResizeableType.CONTAINER),

  top: z.number().positive(),

  width: z.number().positive(),
  height: z.number().positive(),

  paddingVertical: z.number().positive(),
  paddingHorizontal: z.number().positive(),
});

export type TResizeableContainer = z.infer<typeof ResizeableContainerSchema>;

export const ResizeableSchema = z.union([
  ResizeableTextSchema,
  ResizeableContainerSchema,
]);

export type TResizeableData = TResizeableText | TResizeableContainer;
export type TResizeable = Record<string, TResizeableData>;

const RESIZEABLE = {
  "control-informations-header-text": {
    type: ResizeableType.TEXT,
    fontSize: 15,
  },
  "control-informations-date-text": {
    type: ResizeableType.TEXT,
    fontSize: 24,
  },
  "control-informations-end-time-text": {
    type: ResizeableType.TEXT,
    fontSize: 21,
  },
  "control-informations-id-text": {
    type: ResizeableType.TEXT,
    fontSize: 22,
  },
  "control-informations-container": {
    type: ResizeableType.CONTAINER,

    top: 702,

    width: 384,
    height: 115,

    paddingVertical: 6,
    paddingHorizontal: 15,
  },
} as const satisfies TResizeable;

export type TResizeableIds = keyof typeof RESIZEABLE;

export const resizeableChildStyle = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,

    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,

    height: "25%",
    width: "100%",

    backgroundColor: "#eee",

    shadowColor: "rgba(0, 0, 0, .2)",
    shadowRadius: 3,
    shadowOffset: { height: 2, width: 0 },

    padding: 22,

    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default RESIZEABLE;
