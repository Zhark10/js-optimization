const IndexedArray = new Proxy(Array, {
  construct(target, [array]) {
    const cachedArray = {ids: {}, names: {}}
    array.forEach(item => cachedArray.ids[item.id] = cachedArray.names[item.name] = item)
    return new Proxy(new target(...array), {
        get(targetArray, prop) {
            const proxyMethods = {
                "push": item => {
                    cachedArray.ids[item.id] = cachedArray.names[item.name] = item
                    targetArray[prop].call(targetArray. prop)
                },
                "findByName": name => cachedArray.names[name],
                "findById": id => cachedArray.names[id],
            }
            return proxyMethods[prop] || targetArray
        }
    })
  }
})

const users = [
  {id: 153, name: "Arkady", age: 27},
  {id: 163, name: "Max", age: 25},
  {id: 142, name: "Dasha", age: 32},
]

const indexedUsers = new IndexedArray(users)

console.log(indexedUsers.findByName("Arkady"))