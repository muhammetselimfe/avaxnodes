
import dbConnect from '../../../../lib/dbConnect'

export default async (parent, args, context, info) => {
  await dbConnect()

  try {
    const result = await Promise.resolve({
      users: 100,
      total: 41393,
    })
    return result
  } catch (error) {
    console.log('!!!!!!!!!!!', error)
    throw error;
  }
}
