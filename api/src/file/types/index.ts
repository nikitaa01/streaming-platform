export type File = {
  name: string;
  path: string;
  url: string;
  isDir: boolean;
};

export interface CurrentFile extends File {
  files: File[];
}
