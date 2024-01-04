// Nomenclatura de variáveis

const categoryList = [
  {
    title: 'User',
    followers: 5
  },
  {
    title: 'Friendly',
    followers: 50,
  },
  {
    title: 'Famous',
    followers: 500,
  },
  {
    title: 'Super Star',
    followers: 1000,
  },
]

export default async function getUserWithCategory(req, res) {
  const username = String(req.query.username)

  if (!username) {
    return res.status(400).json({
      message: `Please provide an username to search on the github API`
    })
  }

  const userResponse = await fetch(`https://api.github.com/users/${username}`);

  if (userResponse.status === 404) {
    return res.status(400).json({
      message: `User with username "${username}" not found`
    })
  }

  const userData = await userResponse.json()

  const orderedCategoryList = categoryList.sort((obj1, obj2) =>  obj2.followers - obj1.followers);

  const userCategory = orderedCategoryList.find(category => userData.followers > category.followers)

  if (!userCategory) {
      return res.status(400).json({
          message: `User with username "${username}" has no category`
      })
  }

  const userWithCategory = {
      username,
    category: userCategory.title
  }

  return userWithCategory
}

getUserWithCategory({ query: {
  username: 'josepholiveira'
}}, {})
