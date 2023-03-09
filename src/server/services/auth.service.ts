import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from './../config';
import { CreateUserDto } from './../dtos/users.dto';
import { HttpException } from './../exceptions/HttpException';
import { DataStoredInToken, TokenData } from './../interfaces/auth.interface';
import { User } from './../interfaces/users.interface';
import { Users } from './../models/users.model';
import { isEmpty } from './../utils/util';
import createAuthApiInstance from '../utils/createAuthApiInstance';

class AuthService {
  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: Users = await Users.query().select().from('users').where('userid', '=', userData.email).first();
    if (findUser) throw new HttpException(409, `This userid ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await Users.query()
      .insert({ ...userData, password: hashedPassword })
      .into('users');

    return createUserData;
  }

  public async login(userData: CreateUserDto): Promise<{ cookie: string; tokenData: string; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await Users.query().select().from('users').where('userid', '=', userData.email).first();
    if (!findUser) throw new HttpException(409, `Invalid credentials.`);

    const authApi = createAuthApiInstance();

    return new Promise((resolve, reject) => {
      authApi.post('/', {USERID: userData.email, PASSWORD: userData.password})
      .then((response) => {
        const serverResponse = response.data
        console.log(serverResponse)
        const tokenData: any = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);
        if(serverResponse.STATUS === "00"){
          resolve({ cookie, tokenData, findUser })
        }else{
          throw new HttpException(409, `Invalid credentials.`);
        }
      }).catch(error => {
        reject(error)
      })
    })

  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, "userData is empty");

    const findUser: User = await Users.query()
      .select()
      .from('users')
      .where('email', '=', userData.email)
      .andWhere('password', '=', userData.password)
      .first();

    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthService;
