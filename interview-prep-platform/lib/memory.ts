const key = 'token'
export const setToken = async (value: string) => {
    try {
        localStorage.setItem(key, value);
        return true
    } catch (error) {
        return false
    }
}

export const getToken = async () => {
    try {
        const result = localStorage.getItem(key)
        return result
    } catch (error) {
        return null
    }
}

export const removeToken = async () => {
    try {
        const result = localStorage.removeItem(key);
        return true
    } catch (error) {
        return false
    }
}