import Colors from './Colors';

export const Twilight = {
  dark: true,
  colors: {
    primary: Colors.logoLightBlue,
    background: Colors.twilightBackground,
    card: Colors.twilightBackground, //navigation background
    text: Colors.twilightIcon, //header text
    border: Colors.twilightBackground, //border without shadows
    notification: Colors.entryOrange, //notification circle on icons
  },
};

export const Daylight = {
  dark: false,
  colors: {
    primary: Colors.logoLightBlue,
    background: Colors.daylightBackground,
    card: Colors.daylightBackground,
    text: Colors.daylightIcon,
    border: Colors.daylightBackground,
    notification: Colors.entryOrange,
  },
};

export const Midnight = {
  dark: true,
  colors: {
    primary: Colors.logoLightBlue,
    background: Colors.midnightBackground,
    card: Colors.midnightBackground,
    text: Colors.midnightIcon,
    border: Colors.midnightBackground,
    notification: Colors.entryOrange,
  },
};

export const getTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Daylight;
    case 'twilight': return Twilight;
    case 'midnight': return Midnight;
    default: return Twilight;
  }
};

export const getStatusBarTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return 'dark';
    case 'twilight': return 'light';
    case 'midnight': return 'light';
    default: return 'light';
  }
};

export const getGradientTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return [Colors.daylightLightEntry, Colors.daylightDarkEntry, Colors.daylightLightEntry];
    case 'twilight': return [Colors.twilightLightEntry, Colors.twilightDarkEntry, Colors.twilightLightEntry];
    case 'midnight': return [Colors.midnightLightEntry, Colors.midnightDarkEntry, Colors.midnightLightEntry];
    default: return [Colors.twilightLightEntry, Colors.twilightDarkEntry, Colors.twilightLightEntry];
  }
};

export const getBackgroundTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightBackground;
    case 'twilight': return Colors.twilightBackground;
    case 'midnight': return Colors.midnightBackground;
    default: return Colors.twilightBackground;
  }
};

export const getRimTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightRim;
    case 'twilight': return Colors.twilightRim;
    case 'midnight': return Colors.midnightRim;
    default: return Colors.twilightRim;
  }
};

export const getDarkEntryTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightDarkEntry;
    case 'twilight': return Colors.twilightDarkEntry;
    case 'midnight': return Colors.midnightDarkEntry;
    default: return Colors.twilightDarkEntry;
  }
};

export const getLightEntryTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightLightEntry;
    case 'twilight': return Colors.twilightLightEntry;
    case 'midnight': return Colors.midnightLightEntry;
    default: return Colors.twilightLightEntry;
  }
};

export const getTextTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightText;
    case 'twilight': return Colors.twilightText;
    case 'midnight': return Colors.midnightText;
    default: return Colors.twilightText;
  }
};

export const getIconTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightIcon;
    case 'twilight': return Colors.twilightIcon;
    case 'midnight': return Colors.midnightIcon;
    default: return Colors.twilightIcon;
  }
};

export const getBorderTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightBorder;
    case 'twilight': return Colors.twilightBorder;
    case 'midnight': return Colors.midnightBorder;
    default: return Colors.twilightBorder;
  }
};

export const getHeaderTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return 'white';
    case 'twilight': return 'black';
    case 'midnight': return 'black';
    default: return 'black';
  }
};

export const getInfoIconTheme = (appearance) => {
  switch(appearance){
    case 'daylight': return Colors.daylightInfoIcon;
    case 'twilight': return Colors.twilightInfoIcon;
    case 'midnight': return Colors.midnightInfoIcon;
    default: return Colors.twilightInfoIcon;
  }
};