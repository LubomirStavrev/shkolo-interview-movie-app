import '@emotion/react';

declare module '@emotion/react' {
  export interface Theme {
    colors: {
      background: {
        primary: string;
        secondary: string;
        tertiary: string;
        quaternary: string;
      };
      text: {
        primary: string;
        secondary: string;
        tertiary: string;
        inactive: string;
        error: string;
      };
      brand: {
        primary: string;
        secondary: string;
        facebook: string;
      };
      ui: {
        divider: string;
        inactive: string;
        shadow: string;
        searchBar: string;
        tabBar: {
          active: string;
          inactive: string;
          background: string;
        }
      };
      status: {
        error: string;
        success: string;
        warning: string;
      };
      common: {
        white: string;
        black: string;
        transparent: string;
      };
    };
    spacing: {
      xs: number;
      s: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
}
