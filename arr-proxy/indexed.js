const OptimizedArray = new Proxy(Array, {
  construct(target, [array]) {
    const arrayFields = Object.keys(array[0])
    const arrayToSearchByUID = {}
    const cachedArray = {}
    arrayFields.forEach(fieldName => cachedArray[fieldName] = {})

    const updArrays = item => {
         arrayFields.forEach(fieldName => {
            const generatedUID = `UID-${Object.values(item).join("")}`
            cachedArray[fieldName][item[fieldName]] = generatedUID
            arrayToSearchByUID[generatedUID] = item
        })
    }
      
    array.forEach(updArrays)
    
    return new Proxy(new target(...array), {
        get(targetArray, prop) {
            const proxyMethods = {
                "push": item => {
                    updArrays(item)
                    targetArray[prop].call(targetArray. prop)
                },
                "findByField": (fieldName, searchValue) => {
                    const foundUID = cachedArray[fieldName][searchValue]
                    console.log('foundUID', foundUID)
                    return arrayToSearchByUID[foundUID]
                },
            }
            return proxyMethods[prop] || targetArray
        }
    })
  }
})

const users = [
  {id: 163, name: "Max", age: 25},
  {id: 142, name: "Dasha", age: 32},
  {id: 146, name: "Dmitry", age: 31},
  {id: 153, name: "Arkady", age: 27},
]

const indexedUsers = new OptimizedArray(users)

console.log(indexedUsers.findByField("name", "Dasha"))
console.log(indexedUsers.findByField("id", "142"))
console.log(indexedUsers.findByField("name", "Dmitry"))
console.log(indexedUsers.findByField("age", "32"))
