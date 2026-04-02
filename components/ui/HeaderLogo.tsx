import React from 'react';
import foundationWordmark from '../../assets/ioi-foundation-wordmark.svg';

export const HeaderLogo: React.FC<React.ImgHTMLAttributes<HTMLImageElement>> = ({
  alt = 'IOI Foundation',
  className,
  draggable = false,
  ...props
}) => {
  const mergedClassName = className ? `object-contain ${className}` : 'object-contain';

  return (
    <img
      src={foundationWordmark}
      alt={alt}
      className={mergedClassName}
      draggable={draggable}
      {...props}
    />
  );
};
