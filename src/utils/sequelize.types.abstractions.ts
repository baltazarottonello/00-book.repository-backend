import { Attributes, Model } from 'sequelize';
import { Col, Fn, Literal } from 'sequelize/types/utils';

export type UpdateValues<M extends Model> = {
  [key in keyof Attributes<M>]?: Fn | Col | Literal | Attributes<M>[key];
};
