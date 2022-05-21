import fetch from "node-fetch";

const OptimizedArray = new Proxy(Array, {
  construct(target, [array]) {
    const cached = { dataToSearchByUID: {}, searchLinks: {} }
    const arrayFields = Object.keys(array[0])

    const updateArrays = item => {
      arrayFields.forEach(fieldName => {
        const fieldsCountToUIDGeneration = 3
        const generatedUID = `UID-${Object.values(item).slice(0, fieldsCountToUIDGeneration).join("__")}`
        cached.searchLinks[fieldName][item[fieldName]] = generatedUID
        cached.dataToSearchByUID[generatedUID] = item
      })
    }

    arrayFields.forEach(fieldName => cached.searchLinks[fieldName] = {})
    array.forEach(updateArrays)

    return new Proxy(new target(...array), {
      get(targetArray, prop) {
        const push = item => {
          updateArrays(item)
          targetArray[prop].call(targetArray.prop)
        }
        const findByField = (fieldName, searchValue) => {
          if (cached.searchLinks.hasOwnProperty(fieldName)) {
            const foundUID = cached.searchLinks[fieldName][searchValue]
            return cached.dataToSearchByUID[foundUID]
          }
          return null
        }
        const proxyMethods = { push, findByField }
        return proxyMethods[prop] ?? targetArray
      }
    })
  }
})

const test = async () => {
  // e.g.
  async function getGitHubUsers() {
    const response = await fetch("https://api.github.com/users")
    const data = await response.json()
    return data
  }
  const users = await getGitHubUsers()
  const indexedUsers = new OptimizedArray(users)

  const TEST_USER_ID = 5
  const TEST_FIELD_ID = 1
  const TEST_USER = {
    FIELD: Object.keys(users[TEST_USER_ID])[TEST_FIELD_ID],
    SERACH_VALUE: Object.values(users[TEST_USER_ID])[TEST_FIELD_ID],
  }
  const testResult = indexedUsers.findByField(TEST_USER.FIELD, TEST_USER.SERACH_VALUE)
  console.log(testResult)
}

test()
