async function registerUser(userData) {
  const { email, name, avatar } = userData

  if (!avatar) {
    return { error: 'avatar is required' }
  }

  if (!name) {
    return { error: 'name is required' }
  }

  const isEmailAlreadyInUse = getUserByEmail(email)

  if (isEmailAlreadyInUse) {
    return { error: 'email already used' }
  }

  const avatarInJPGFormat = convertImageToJPG(avatar)

  const userCreated = await createUser({ email, name, avatar: avatarInJPGFormat })

  return { userCreated }
}
