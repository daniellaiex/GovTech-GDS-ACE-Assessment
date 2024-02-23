import User from '../src/models/user';
import bcrypt from 'bcrypt';

async function createUser() {
  const isDatabaseEmpty = await User.countDocuments() === 0;

  if (isDatabaseEmpty) {
    const hashedPassword = await bcrypt.hash('hohoho', 10);

    const user = new User({
      username: 'santa',
      password: hashedPassword,
    });

    try {
      user.save();
      console.log('Database User Collection Populated')
    } catch (error) {
      console.error('Error saving user to MongoDB:', error);
    }
  }
}

export default createUser;