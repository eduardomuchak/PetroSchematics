export interface MousePosition {
  yAxis: number;
  xAxis: number;
}

export interface SurfaceEquipment extends MousePosition {
  surfaceEquipment: string;
  description: string;
}

export interface SubsurfaceEquipment extends MousePosition {
  subsurfaceEquipment: string;
  odInch: string;
  idInch: string;
  manufacturer: string;
  depth: string;
}
export interface InitialSchematicValue {
  maxDepth: number;
  mousePosition: MousePosition;
  surfaceEquipmentTable: SurfaceEquipment[];
  subsurfaceEquipmentTable: SubsurfaceEquipment[];
}

export interface SchematicState {
  schematicWell: InitialSchematicValue;
}
