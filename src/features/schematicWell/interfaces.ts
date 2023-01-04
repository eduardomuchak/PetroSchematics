export interface MousePosition {
  yAxis: number;
  xAxis: number;
  isSurface: boolean;
}

export interface SurfaceEquipment extends MousePosition {
  _id: string;
  hash: string;
  surfaceEquipment: string;
  description: string;
  height: number;
}

export interface SubsurfaceEquipment extends MousePosition {
  _id: string;
  hash: string;
  subsurfaceEquipment: string;
  odInch: string;
  idInch: string;
  manufacturer: string;
  depth: string;
}

export interface Comment {
  comments: string;
  yAxis: number;
  xAxis: number;
  hash: string;
  _id: string;
  isSurface: boolean;
}
export interface InitialSchematicValue {
  minDepth: number;
  maxDepth: number;
  maxHeight: number;
  mousePosition: MousePosition;
  surfaceEquipmentTable: SurfaceEquipment[];
  subsurfaceEquipmentTable: SubsurfaceEquipment[];
  surfaceComments: Comment[];
  subsurfaceComments: Comment[];
}

export interface SchematicState {
  schematicWell: InitialSchematicValue;
}
