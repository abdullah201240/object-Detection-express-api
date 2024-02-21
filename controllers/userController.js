import User from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
const createToken = ({ id, email, name }) => {
  const secretKey = process.env.JWT_SECRET || 'default_secret_key'
  const expiresIn = '1h'; 

  const token = jwt.sign({ id, email, name }, secretKey, { expiresIn });

  return token;
};
const Signup = async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'User with this email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();
  
      return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error in signup:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  const Login = async (req, res) => {
    try {
      const { email: reqEmail, password } = req.body;
  
      const user = await User.findOne({ email: reqEmail });
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
  
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      const { id, email, name } = user;
      const token = createToken({ id, email, name });
      return res.status(200).json({ token, id, email, name });
  
    } catch (error) {
      console.error('Error in login:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
};



  export { Signup,Login};
