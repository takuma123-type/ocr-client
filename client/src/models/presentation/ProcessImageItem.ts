export class ProcessImageItem {
  readonly file: File;

  constructor(params: { file: File }) {
    this.file = params.file;
  }
}
