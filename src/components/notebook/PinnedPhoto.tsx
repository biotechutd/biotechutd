import { NotebookImage, type NotebookImageProps } from "./NotebookImage";

export function PinnedPhoto(props: NotebookImageProps) {
  return <NotebookImage withTape border rotate={-1} aspectRatio="4 / 5" {...props} />;
}
