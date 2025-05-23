export enum ToolType {
  NONE = 'none',
  CROP = 'crop',
  ROTATE = 'rotate',
  RESIZE = 'resize'
}

export interface ImageInfo {
  element: HTMLImageElement;
  width: number;
  height: number;
}

export interface EditorState {
  originalImage: ImageInfo | null;
  tool: ToolType;
  rotation: number;
  scale: number;
  cropSelection: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  isCropping: boolean;
  isImageLoaded: boolean;
}