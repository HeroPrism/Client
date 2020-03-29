declare module "*.scss" {
    const content: { [id: string]: string };
    export default content;
}

declare module "*.png" {
    const content: string;
    export default content;
}

type Maybe<T> = T | undefined;
type Nullable<T> = T | null;
