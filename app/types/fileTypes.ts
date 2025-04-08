export interface FileState {
  [category: string]: {
    selected: boolean;
    extensions: {
      [ext: string]: boolean;
    };
  };
}
