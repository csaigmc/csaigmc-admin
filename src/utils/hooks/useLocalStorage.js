export const useLocalstorage = () => {

    const getItem = (key) => {
        return window.localStorage.getItem(key)
    }

    const setItem = (key, value) => {
        window.localStorage.setItem(key, value)
    }

    const removeItem = (key) => {
        window.localStorage.removeItem(key)
    }

    return {
        getItem,
        setItem,
        removeItem
    }
}