import {
  AnimatableNumericValue,
  ColorValue,
  DimensionValue,
  FlexAlignType,
} from 'react-native';

export type UtilityProps = {
  gap?: number;
  p?: DimensionValue;
  pl?: DimensionValue;
  pr?: DimensionValue;
  pt?: DimensionValue;
  pb?: DimensionValue;
  m?: DimensionValue;
  mr?: DimensionValue;
  ml?: DimensionValue;
  mb?: DimensionValue;
  mt?: DimensionValue;
  px?: DimensionValue;
  py?: DimensionValue;
  mx?: DimensionValue;
  my?: DimensionValue;
  flex?: number;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: FlexAlignType;
  backgroundColor?: ColorValue;
  flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  borderRadius?: string | AnimatableNumericValue;
  width?: DimensionValue;
  height?: DimensionValue;
};

export type Category = {
  categoryname: string;
  sport: string;
};

export type Subcategory = {
  asd: string;
  subcategory: string;
};

export type UpComingSessions = {
  doctorName: string;
  doctorEmail: string;
  doctorPhone: string;
  sessionStartTimex: string;
  id: string;
  meetingLink: string;
  date: string;
};

export type Doctors = {
  sessionId: string;
  Doctor: string;
  doctorid: string;
  categoryName: string;
  Startime: string;
};

export type Doctor = {
  bio: string;
  Doctor: string;
  doctorid: string;
  categoryName: string;
  Startime: string;
  Price: string;
};
