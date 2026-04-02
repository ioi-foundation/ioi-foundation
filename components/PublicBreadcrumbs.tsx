import React from 'react';

interface PublicBreadcrumbsProps {
  homeLabel: string;
  currentLabel: string;
}

export const PublicBreadcrumbs: React.FC<PublicBreadcrumbsProps> = ({
  homeLabel,
  currentLabel,
}) => {
  return (
    <nav className="page-breadcrumbs" aria-label="Breadcrumb">
      <a href="/" className="page-breadcrumb-link">
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
