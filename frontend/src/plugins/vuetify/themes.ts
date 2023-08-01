import { ThemeDefinition } from 'vuetify'

export const darkTheme: ThemeDefinition = {
    dark: true,
    colors: {
        background: '#0f0f11',
        surface: '#17181b',
        primary: '#47a6b6',
        secondary: '#ffffff',
        inside: '#1a1b1f'
    }
}

export const lightTheme: ThemeDefinition = {
    dark: false,
    colors: {
       background: '#f4f5f5',
       surface: '#fcfcfc',
       primary: '#47a6b6',
       inside: '#e6e7e9'
    }
}