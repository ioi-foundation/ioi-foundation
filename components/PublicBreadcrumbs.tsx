import React from 'react';

interface PublicBreadcrumbsProps {
  homeLabel: string;
  currentLabel: string;
  homeHref: string;
}

export const PublicBreadcrumbs: React.FC<PublicBreadcrumbsProps> = ({
  homeLabel,
  currentLabel,
  homeHref,
}) => {
  return (
    <nav className="page-breadcrumbs" aria-label="Breadcrumb">
      <a href={homeHref} className="page-breadcrumb-link">
        {homeLabel}
      </a>
      <span className="page-breadcrumb-separator" aria-hidden="true">
        /
      </span>
      <span className="page-breadcrumb-current" aria-current="page">
        {currentLabel}
      </span>
    </nav>
  );
};
