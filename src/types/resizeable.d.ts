import { Dispatch, SetStateAction } from "react";
import { TResizeableData } from "@/constant/resizeable";

export interface IResizeableModalChildProps<T> {
  id: string;

  defaultValue: T;

  value: T;
  setValue: Dispatch<SetStateAction<TResizeableData | undefined>>;

  submit: () => Promise<void>;
  close: () => Promise<void>;
}
