declare module "*.jpg" {
  import { ImageSourcePropType } from "react-native";

  const value: ImageSourcePropType;
  export default value;
}

declare module "*.png" {
  import { ImageSourcePropType } from "react-native";

  const value: ImageSourcePropType;
  export default value;
}

declare module "*.jpeg" {
  import { ImageSourcePropType } from "react-native";

  const value: ImageSourcePropType;
  export default value;
}

declare module "*.ttf" {
  import { FontSource } from "expo-font";

  const value: FontSource;
  export default value;
}

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
    ? []
    : T extends Array<any> | string
      ? string[]
      : never;

declare interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}

declare type NumberProperties<T> = {
  [K in keyof T as T[K] extends number ? K : never]: T[K];
};
