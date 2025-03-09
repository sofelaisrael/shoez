export const  validate = (email) => {
    const regex = /^[^@]+@[^@]+\.[^@]{2,4}$/
    return regex.test(email)
}

export const getInitials = (name) => {
    if(!name) return ""
    const word = name.split(" ")
    var init = ""
    
    for (let i = 0; i < Math.min(word.length, 2); i++) {
        init += word[i][0]        
    }
    return init.toUpperCase()
}