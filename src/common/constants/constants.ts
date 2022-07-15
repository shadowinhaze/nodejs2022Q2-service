export enum ResCode {
  notFound = 404,
  oldPassWrong = 403,
  deletedSuccess = 204,
}

export enum UserResMsg {
  notFound = 'User with provided ID does not exist',
  oldPassWrong = 'Your current (old password) is wrong',
}

export enum TrackResMsg {
  notFound = 'Track with provided ID does not exist',
}
