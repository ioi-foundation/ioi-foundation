import React, { useId } from 'react';

interface HeaderLogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
}

const HeaderWordmark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 2260 121" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <g transform="translate(0 120.438) scale(0.1720542430 -0.1720542430)" fill="currentColor">
      <path d="M32 700H171V0H32Z" transform="translate(0, 0)" />
      <path d="M772 700Q844 700 908 672.5Q972 645 1019.5 597.5Q1067 550 1094.5 486Q1122 422 1122 350Q1122 278 1094.5 214Q1067 150 1019.5 102.5Q972 55 908 27.5Q844 0 772 0H382Q310 0 246 27.5Q182 55 134.5 102.5Q87 150 59.5 214Q32 278 32 350Q32 422 59.5 486Q87 550 134.5 597.5Q182 645 246 672.5Q310 700 382 700ZM983 350Q983 394 966.5 432Q950 470 921.5 498.5Q893 527 855 543.5Q817 560 773 560H381Q338 560 299.5 543.5Q261 527 232.5 498.5Q204 470 187.5 432Q171 394 171 350Q171 307 187.5 268.5Q204 230 232.5 201.5Q261 173 299.5 156.5Q338 140 381 140H773Q817 140 855 156.5Q893 173 921.5 201.5Q950 230 966.5 268.5Q983 307 983 350Z" transform="translate(284, 0)" />
      <path d="M32 700H171V0H32Z" transform="translate(1518, 0)" />
      <path d="M980 268Q975 237 959 211.5Q943 186 920 167.5Q897 149 868.5 138.5Q840 128 809 128H171V0H32V525Q32 562 45.5 594Q59 626 82.5 649.5Q106 673 138 686.5Q170 700 207 700H809Q840 700 868.5 690Q897 680 920 661.5Q943 643 958.5 617.5Q974 592 980 561H207Q199 560 193 558Q187 556 182 550Q176 545 174 539Q172 533 171 525V268Z" transform="translate(2425, 0)" />
      <path d="M772 700Q844 700 908 672.5Q972 645 1019.5 597.5Q1067 550 1094.5 486Q1122 422 1122 350Q1122 278 1094.5 214Q1067 150 1019.5 102.5Q972 55 908 27.5Q844 0 772 0H382Q310 0 246 27.5Q182 55 134.5 102.5Q87 150 59.5 214Q32 278 32 350Q32 422 59.5 486Q87 550 134.5 597.5Q182 645 246 672.5Q310 700 382 700ZM983 350Q983 394 966.5 432Q950 470 921.5 498.5Q893 527 855 543.5Q817 560 773 560H381Q338 560 299.5 543.5Q261 527 232.5 498.5Q204 470 187.5 432Q171 394 171 350Q171 307 187.5 268.5Q204 230 232.5 201.5Q261 173 299.5 156.5Q338 140 381 140H773Q817 140 855 156.5Q893 173 921.5 201.5Q950 230 966.5 268.5Q983 307 983 350Z" transform="translate(3518, 0)" />
      <path d="M983 350V700H1122V350Q1122 278 1094.5 214Q1067 150 1019.5 102.5Q972 55 908 27.5Q844 0 772 0H382Q310 0 246 27.5Q182 55 134.5 102.5Q87 150 59.5 214Q32 278 32 350V700H171V350Q171 307 187.5 268.5Q204 230 232.5 201.5Q261 173 299.5 156.5Q338 140 381 140H773Q817 140 855 156.5Q893 173 921.5 201.5Q950 230 966.5 268.5Q983 307 983 350Z" transform="translate(4752, 0)" />
      <path d="M984 700V70Q984 65 983.5 61Q983 57 982 52Q976 29 957 14.5Q938 0 914 0Q895 0 880 9L844 28L171 511V0H32V630Q32 659 52.5 679.5Q73 700 102 700Q120 700 136 691L171 671L844 189V700Z" transform="translate(5986, 0)" />
      <path d="M706 700Q778 700 842 672.5Q906 645 953.5 597.5Q1001 550 1028.5 486Q1056 422 1056 350Q1056 278 1028.5 214Q1001 150 953.5 102.5Q906 55 842 27.5Q778 0 706 0H32V700ZM917 350Q917 394 900.5 432Q884 470 855.5 498.5Q827 527 789 543.5Q751 560 707 560H170V140H707Q751 140 789 156.5Q827 173 855.5 201.5Q884 230 900.5 268.5Q917 307 917 350Z" transform="translate(7082, 0)" />
      <path d="M772 700Q844 700 908 672.5Q972 645 1019.5 597.5Q1067 550 1094.5 486Q1122 422 1122 350V0H983V207H171V0H32V350Q32 422 59.5 486Q87 550 134.5 597.5Q182 645 246 672.5Q310 700 382 700ZM983 346V350Q983 394 966.5 432Q950 470 921.5 498.5Q893 527 855 543.5Q817 560 773 560H381Q338 560 299.5 543.5Q261 527 232.5 498.5Q204 470 187.5 432Q171 394 171 350V346Z" transform="translate(8250, 0)" />
      <path d="M864 700Q895 700 922.5 689.5Q950 679 972.5 660Q995 641 1011 616Q1027 591 1033 561H602V0H463V561H32L43 589Q52 613 67.5 633Q83 653 104 667.5Q125 682 149.5 690.5Q174 699 199 700Z" transform="translate(9484, 0)" />
      <path d="M32 700H171V0H32Z" transform="translate(10629, 0)" />
      <path d="M772 700Q844 700 908 672.5Q972 645 1019.5 597.5Q1067 550 1094.5 486Q1122 422 1122 350Q1122 278 1094.5 214Q1067 150 1019.5 102.5Q972 55 908 27.5Q844 0 772 0H382Q310 0 246 27.5Q182 55 134.5 102.5Q87 150 59.5 214Q32 278 32 350Q32 422 59.5 486Q87 550 134.5 597.5Q182 645 246 672.5Q310 700 382 700ZM983 350Q983 394 966.5 432Q950 470 921.5 498.5Q893 527 855 543.5Q817 560 773 560H381Q338 560 299.5 543.5Q261 527 232.5 498.5Q204 470 187.5 432Q171 394 171 350Q171 307 187.5 268.5Q204 230 232.5 201.5Q261 173 299.5 156.5Q338 140 381 140H773Q817 140 855 156.5Q893 173 921.5 201.5Q950 230 966.5 268.5Q983 307 983 350Z" transform="translate(10913, 0)" />
      <path d="M984 700V70Q984 65 983.5 61Q983 57 982 52Q976 29 957 14.5Q938 0 914 0Q895 0 880 9L844 28L171 511V0H32V630Q32 659 52.5 679.5Q73 700 102 700Q120 700 136 691L171 671L844 189V700Z" transform="translate(12147, 0)" />
    </g>
  </svg>
);

export const HeaderLogo: React.FC<HeaderLogoProps> = ({
  className,
  label,
  ...props
}) => {
  const id = useId().replace(/:/g, '');
  const gradientIds = {
    g0: `${id}-g0`,
    g1: `${id}-g1`,
    g2: `${id}-g2`,
    g3: `${id}-g3`,
    g4: `${id}-g4`,
    g5: `${id}-g5`,
    g6: `${id}-g6`,
    g7: `${id}-g7`,
    g8: `${id}-g8`,
    g9: `${id}-g9`,
    g10: `${id}-g10`,
  };

  const mergedClassName = className ? `header-logo-lockup ${className}` : 'header-logo-lockup';

  return (
    <span
      className={mergedClassName}
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      {...props}
    >
      <span className="header-logo-mark-shell">
        <svg className="header-logo-mark" xmlns="http://www.w3.org/2000/svg" viewBox="108.97 89.47 781.56 706.06" focusable="false">
          <defs>
            <linearGradient id={gradientIds.g0} x1="295.299" x2="485.379" y1="544.373" y2="544.373" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#3650c0" /><stop offset="1" stopColor="#346acf" /></linearGradient>
            <linearGradient id={gradientIds.g1} x1="302.61" x2="697.39" y1="421.968" y2="421.968" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f7f8f7" /><stop offset="1" stopColor="#b0c6f4" /></linearGradient>
            <linearGradient id={gradientIds.g2} x1="797.683" x2="797.683" y1="740.594" y2="425.085" gradientUnits="userSpaceOnUse"><stop offset=".201" stopColor="#3b5eda" /><stop offset="1" stopColor="#2740a8" /></linearGradient>
            <linearGradient id={gradientIds.g3} x1="609.661" x2="609.661" y1="654.115" y2="434.631" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#c8dcfd" /><stop offset="1" stopColor="#93bef8" /></linearGradient>
            <linearGradient id={gradientIds.g4} x1="223.747" x2="392.673" y1="846.122" y2="694.02" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#83a0e0" /><stop offset="1" stopColor="#5b86de" /></linearGradient>
            <linearGradient id={gradientIds.g5} x1="518.726" x2="622.437" y1="314.342" y2="252.027" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#759ce8" /><stop offset=".289" stopColor="#7198e5" /><stop offset=".548" stopColor="#688dde" /><stop offset=".795" stopColor="#587bd2" /><stop offset="1" stopColor="#4666c4" /></linearGradient>
            <linearGradient id={gradientIds.g6} x1="202.317" x2="202.317" y1="740.594" y2="425.086" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#d3d3df" /><stop offset=".531" stopColor="#e8e9ed" /><stop offset="1" stopColor="#f7f8f7" /></linearGradient>
            <linearGradient id={gradientIds.g7} x1="688.68" x2="688.68" y1="780.741" y2="675.219" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#5a8cec" /><stop offset="1" stopColor="#3b67d3" /></linearGradient>
            <linearGradient id={gradientIds.g8} x1="389.872" x2="389.872" y1="414.066" y2="104.779" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#f7f8f7" /><stop offset="1" stopColor="#b2c8f4" /></linearGradient>
            <linearGradient id={gradientIds.g9} x1="401.305" x2="401.305" y1="780.741" y2="552.815" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#75abf0" /><stop offset=".316" stopColor="#699aeb" /><stop offset=".936" stopColor="#4d6fe0" /><stop offset="1" stopColor="#4a6bdf" /></linearGradient>
            <linearGradient id={gradientIds.g10} x1="598.695" x2="598.695" y1="780.741" y2="552.815" gradientUnits="userSpaceOnUse"><stop offset="0" stopColor="#bbd8f2" /><stop offset=".164" stopColor="#b3d3f1" /><stop offset=".413" stopColor="#9ec6ef" /><stop offset=".714" stopColor="#7cb0ed" /><stop offset="1" stopColor="#5698ea" /></linearGradient>
          </defs>
          <g>
            <path fill={`url(#${gradientIds.g0})`} d="M295.299 434.631L295.299 654.116 485.379 544.373 295.299 434.631Z" />
            <path fill={`url(#${gradientIds.g1})`} d="M500 535.931L697.39 421.968 500 308.005 302.61 421.968 500 535.931Z" />
            <path fill={`url(#${gradientIds.g2})`} d="M719.322 662.557L854.487 740.594 876.043 695.903 719.322 425.085 719.322 662.557Z" />
            <path fill={`url(#${gradientIds.g3})`} d="M514.621 544.373L704.701 654.115 704.701 434.631 514.621 544.373Z" />
            <path fill={`url(#${gradientIds.g4})`} d="M287.988 675.22L151.883 753.8 164.878 780.741 470.757 780.741 287.988 675.22Z" />
            <path fill={`url(#${gradientIds.g5})`} d="M507.31 295.342L712.945 414.066 533.962 104.779 507.31 104.779 507.31 295.342Z" />
            <path fill={`url(#${gradientIds.g6})`} d="M280.678 662.557L280.678 425.086 123.957 695.903 145.513 740.594 280.678 662.557Z" />
            <path fill={`url(#${gradientIds.g7})`} d="M712.012 675.219L529.242 780.741 835.122 780.741 848.117 753.8 712.012 675.219Z" />
            <path fill={`url(#${gradientIds.g8})`} d="M492.689 295.343L492.689 104.779 466.038 104.779 287.055 414.066 492.689 295.343Z" />
            <path fill={`url(#${gradientIds.g9})`} d="M302.61 666.778L500 780.741 500 780.741 500 552.815 302.61 666.778Z" />
            <path fill={`url(#${gradientIds.g10})`} d="M500 552.815L500 780.741 697.39 666.778 500 552.815Z" />
          </g>
        </svg>
      </span>

      <span className="header-logo-wordmark-shell">
        <HeaderWordmark className="header-logo-wordmark" focusable="false" />
      </span>
    </span>
  );
};
