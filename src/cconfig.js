const modes = {
    dev: "dev",
    prod: "prod"
} 
const getConfigKey = (key) => {
    return MODE === modes.dev ? process.env[`REACT_APP_DEV_${key}`] : process.env[`REACT_APP_PROD_${key}`] 
}

export const MODE=process.env.REACT_APP_MODE
export const __DEV__ = (MODE === modes.dev) 
export const BASE_URL = getConfigKey('BASE_URL')