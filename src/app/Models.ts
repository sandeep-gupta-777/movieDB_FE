/**
 * Created by sandgup3 on 17/12/2017.
 */
export interface User {

  _id?:string,

  userCustomID?: string,
  userPassword?: string,
  userFullName?: string,
  userEmail?: string,
  userMobileNumber?: string,
  userRole?: string,

  userProfileID?: string,  userProfilePicURL?: string,  userVotes?: string[], userComments?: { comment: string; image: string }[],
  userUploaded?: string[],   userDateOfSignup?: Date,   userLastLogin?: Date
}

export interface Movie{
  id?:number,
  poster_path?: string,
  cast?: {name:string}[],
  original_language?: string,
  original_title?: string,
  release_date?: string,
  popularity?: string,
  runtime?: string,
  overview?: string,
  credits?:any,
  production_companies?:string,
  directors?:string[],
}

export interface Artist{
  id:number,
  profile_path?: string,
  name?: string,
  known_for: Movie[],
}

export interface Criteria {
  search_mode:string,
  keyword:string
}

export enum MovieMode {
  RECENT,
  TOP_RATED
}
