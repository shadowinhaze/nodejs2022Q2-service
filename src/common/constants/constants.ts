export enum ApiPath {
  users = 'user',
  tracks = 'track',
  artists = 'artist',
}

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

export enum ArtistResMsg {
  notFound = 'Artist with provided ID does not exist',
}

export enum AlbumResMsg {
  notFound = 'Album with provided ID does not exist',
}
