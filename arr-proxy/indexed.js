import fetch from "node-fetch";

const OptimizedArray = new Proxy(Array, {
  construct(target, [array]) {
    const cachedDataToSearchByUID = {}
    const cachedSearchLinks = {}
    const arrayFields = Object.keys(array[0])

    const updateArrays = item => {
      arrayFields.forEach(fieldName => {
        const fieldsCountToUIDGeneration = 3
        const generatedUID = `UID-${Object.values(item).slice(0, fieldsCountToUIDGeneration).join("__")}`
        cachedSearchLinks[fieldName][item[fieldName]] = generatedUID
        cachedDataToSearchByUID[generatedUID] = item
      })
    }

    arrayFields.forEach(fieldName => cachedSearchLinks[fieldName] = {})
    array.forEach(updateArrays)

    return new Proxy(new target(...array), {
      get(targetArray, prop) {
        const proxyMethods = {
          "push": item => {
            updateArrays(item)
            targetArray[prop].call(targetArray.prop)
          },
          "findByField": (fieldName, searchValue) => {
            if (cachedSearchLinks.hasOwnProperty(fieldName)) {
              const foundUID = cachedSearchLinks[fieldName][searchValue]
              return cachedDataToSearchByUID[foundUID]
            }
            return null
          },
        }
        return proxyMethods[prop] || targetArray
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
