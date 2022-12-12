export interface MousePosition {
  yAxis: number;
  xAxis: number;
}

export interface SurfaceEquipment extends MousePosition {
  _id: string;
  surfaceEquipment: string;
  description: string;
}

export interface SubsurfaceEquipment extends MousePosition {
  _id: string;
  subsurfaceEquipment: string;
  odInch: string;
  idInch: string;
  manufacturer: string;
  depth: string;
}

export interface Comment extends MousePosition {
  comment: string;
}
export interface InitialSchematicValue {
  maxDepth: number;
  mousePosition: MousePosition;
  surfaceEquipmentTable: SurfaceEquipment[];
  subsurfaceEquipmentTable: SubsurfaceEquipment[];
  comments: Comment[];
}

export interface SchematicState {
  schematicWell: InitialSchematicValue;
}
