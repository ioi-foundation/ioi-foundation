import React, { useId } from 'react';

export const HeaderLogo: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  const uid = useId().replace(/:/g, '');
  const gradientId = (name: string) => `${uid}-${name}`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg" role="img" viewBox="108.97 89.47 781.56 706.06" {...props}>
      <defs>
        <linearGradient id={gradientId('linear-gradient')} x1="295.299" x2="485.379" y1="544.373" y2="544.373" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3650c0"/><stop offset="1" stopColor="#346acf"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient1')} x1="302.61" x2="697.39" y1="421.968" y2="421.968" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f7f8f7"/><stop offset="1" stopColor="#b0c6f4"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient2')} x1="797.683" x2="797.683" y1="740.594" y2="425.085" gradientUnits="userSpaceOnUse"><stop offset=".201" stopColor="#3b5eda"/><stop offset="1" stopColor="#2740a8"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient3')} x1="609.661" x2="609.661" y1="654.115" y2="434.631" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c8dcfd"/><stop offset="1" stopColor="#93bef8"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient4')} x1="223.747" x2="392.673" y1="846.122" y2="694.02" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#83a0e0"/><stop offset="1" stopColor="#5b86de"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient5')} x1="518.726" x2="622.437" y1="314.342" y2="252.027" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#759ce8"/><stop offset=".289" stopColor="#7198e5"/><stop offset=".548" stopColor="#688dde"/><stop offset=".795" stopColor="#587bd2"/><stop offset="1" stopColor="#4666c4"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient6')} x1="202.317" x2="202.317" y1="740.594" y2="425.086" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d3d3df"/><stop offset=".531" stopColor="#e8e9ed"/><stop offset="1" stopColor="#f7f8f7"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient7')} x1="688.68" x2="688.68" y1="780.741" y2="675.219" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5a8cec"/><stop offset="1" stopColor="#3b67d3"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient8')} x1="389.872" x2="389.872" y1="414.066" y2="104.779" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f7f8f7"/><stop offset="1" stopColor="#b2c8f4"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient9')} x1="401.305" x2="401.305" y1="780.741" y2="552.815" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#75abf0"/><stop offset=".316" stopColor="#699aeb"/><stop offset=".936" stopColor="#4d6fe0"/><stop offset="1" stopColor="#4a6bdf"/></linearGradient>
        <linearGradient id={gradientId('linear-gradient10')} x1="598.695" x2="598.695" y1="780.741" y2="552.815" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#bbd8f2"/><stop offset=".164" stopColor="#b3d3f1"/><stop offset=".413" stopColor="#9ec6ef"/><stop offset=".714" stopColor="#7cb0ed"/><stop offset="1" stopColor="#5698ea"/></linearGradient>
      </defs>
      <g>
        <path fill={`url(#${gradientId('linear-gradient')})`} d="M295.299 434.631L295.299 654.116 485.379 544.373 295.299 434.631z"/>
        <path fill={`url(#${gradientId('linear-gradient1')})`} d="M500 535.931L697.39 421.968 500 308.005 302.61 421.968 500 535.931z"/>
        <path fill={`url(#${gradientId('linear-gradient2')})`} d="M719.322 662.557L854.487 740.594 876.043 695.903 719.322 425.085 719.322 662.557z"/>
        <path fill={`url(#${gradientId('linear-gradient3')})`} d="M514.621 544.373L704.701 654.115 704.701 434.631 514.621 544.373z"/>
        <path fill={`url(#${gradientId('linear-gradient4')})`} d="M287.988 675.22L151.883 753.8 164.878 780.741 470.757 780.741 287.988 675.22z"/>
        <path fill={`url(#${gradientId('linear-gradient5')})`} d="M507.31 295.342L712.945 414.066 533.962 104.779 507.31 104.779 507.31 295.342z"/>
        <path fill={`url(#${gradientId('linear-gradient6')})`} d="M280.678 662.557L280.678 425.086 123.957 695.903 145.513 740.594 280.678 662.557z"/>
        <path fill={`url(#${gradientId('linear-gradient7')})`} d="M712.012 675.219L529.242 780.741 835.122 780.741 848.117 753.8 712.012 675.219z"/>
        <path fill={`url(#${gradientId('linear-gradient8')})`} d="M492.689 295.343L492.689 104.779 466.038 104.779 287.055 414.066 492.689 295.343z"/>
        <g>
          <path fill={`url(#${gradientId('linear-gradient9')})`} d="M302.61 666.778L500 780.741 500 780.741 500 552.815 302.61 666.778z"/>
          <path fill={`url(#${gradientId('linear-gradient10')})`} d="M500 552.815L500 780.741 697.39 666.778 500 552.815z"/>
        </g>
      </g>
    </svg>
  );
};
