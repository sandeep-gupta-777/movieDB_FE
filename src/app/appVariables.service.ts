import {Injectable} from '@angular/core';

@Injectable()
export class AppVariablesService {

  constructor() {
  }
  readonly FRONTEND_LOGIN_PAGE_URL = 'login';
  public previousSRPURL  = "/";
  public LOCALSTORAGE_user_id  = 'user_id';
  readonly MOVIE_DB_API_KEY = '7f148f6061d6b81c3745e3bb8b0cbd33';
}
