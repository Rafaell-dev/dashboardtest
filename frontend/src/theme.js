// color design tokens export
export const tokensDark = {
  grey: {
    0: '#ffffff', // manually adjusted
    10: '#f6f6f6', // manually adjusted
    50: '#f0f0f0', // manually adjusted
    100: '#e0e0e0',
    200: '#c2c2c2',
    300: '#a3a3a3',
    400: '#858585',
    500: '#666666',
    600: '#525252',
    700: '#3d3d3d',
    800: '#292929',
    900: '#141414',
    1000: '#000000' // manually adjusted
  },
  primary: {
    // blue
    100: '#d3d4de',
    200: '#D3ECFD',
    300: '#7a7f9d',
    400: '#2F334C', // Active text sidebar
    500: '#1F3265', // manually adjusted background sidebar
    600: '#191F45', // manually adjusted
    700: '#141937', // Dark Blue
    800: '#FF0000',
    900: '#070812'
  },
  secondary: {
    // blue
    50: '#FF0000', // manually adjusted
    100: '#D3ECFD', // Text main
    200: '#D3ECFD', // Icons sidebar and topics
    300: '#A1D2F5',
    400: '#87C8F7',
    500: '#6DBEF8',
    600: '#D3ECFD', //Active background sidebar
    700: '#191F45',
    800: '#191F45',
    900: '#0496FF'
  },
  blue: {
    500: '#0496FF'
  }
}

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {}
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val)
    const values = Object.values(val)
    const length = keys.length
    const reversedObj = {}
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1]
    }
    reversedTokens[key] = reversedObj
  })
  return reversedTokens
}
export const tokensLight = reverseTokens(tokensDark)

// mui theme settings
export const themeSettings = mode => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400]
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300]
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500]
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500]
            },
            blue: {
              ...tokensDark.blue,
              main: tokensDark.blue[500],
              light: tokensDark.blue[500]
            }
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100]
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700]
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500]
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[50]
            },
            blue: {
              ...tokensLight.blue,
              main: tokensDark.blue[500],
              light: tokensDark.blue[500]
            }
          })
    },
    typography: {
      fontFamily: ['Inter', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 40
      },
      h2: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 32
      },
      h3: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 24
      },
      h4: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 20
      },
      h5: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 16
      },
      h6: {
        fontFamily: ['Inter', 'sans-serif'].join(','),
        fontSize: 14
      }
    }
  }
}
