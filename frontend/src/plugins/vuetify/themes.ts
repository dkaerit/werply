import { ThemeDefinition } from 'vuetify'

export const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#0f0f11',
        surface: '#17181b',
        primary: '#47a6b6',
        secondary: '#ffffff',
    }
}

export const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
       background: '#f4f5f5',
       surface: '#fcfcfc',
       primary: '#47a6b6',
    }
}