export interface MousePosition {
  yAxis: number;
  xAxis: number;
}

export interface SurfaceEquipment extends MousePosition {
  _id: string;
  hash: string;
  surfaceEquipment: string;
  description: string;
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
  depth: number;
  xAxis: number;
  hash: string;
  _id: string;
}
export interface InitialSchematicValue {
  minDepth: number;
  maxDepth: number;
  maxHeight: number;
  mousePosition: MousePosition;
  surfaceEquipmentTable: SurfaceEquipment[];
  subsurfaceEquipmentTable: SubsurfaceEquipment[];
  comments: Comment[];
}

export interface SchematicState {
  schematicWell: InitialSchematicValue;
}
