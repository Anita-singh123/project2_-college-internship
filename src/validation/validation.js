
const valid = function(value){
    if(typeof value=="string" && value.trim().length===0)return  false
    if(typeof value==="undefined" || value===null) return false
    return true

}

const nameValidation= function(value){
    let regex= /^[a-zA-Z\s]+$/
    if(!regex.test(value)) return false
    return true
}

const emailValidation= function(value){
    let regex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!regex.test(value)) return false
    return true
}

const mobileValidation= function(value){
let regex= /^\d{10}$/
if(!regex.test(value)) return false
return true
}

const logoValidation= function(value){
    let linkRegex =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
    if(!linkRegex.test(value)) return false
    return true
}

const fullNameValidation= function(value){
    let regex = (/^[a-zA-Z.,() ]{8,80}$/)
    if(!regex) return false
    return true
}




module.exports={valid,nameValidation,emailValidation,mobileValidation,logoValidation,fullNameValidation}
