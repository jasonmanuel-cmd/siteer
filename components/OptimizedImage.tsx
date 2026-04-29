import Image, { ImageProps } from "next/image";
import React from "react";

type Props = ImageProps & {
    className?: string;
};

export default function OptimizedImage({ className, ...props }: Props) {
    return (
        <Image
            {...props}
            className={className}
            sizes={props.sizes ?? "(max-width: 640px) 100vw, 640px"}
            priority={props.priority ?? false}
            loading={props.loading ?? "lazy"}
        />
    );
}
