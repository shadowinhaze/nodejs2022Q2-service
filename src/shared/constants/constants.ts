export enum ApiPath {
  users = 'user',
  tracks = 'track',
  artists = 'artist',
  albums = 'album',
  favorites = 'favs',
}

export enum ResCode {
  deletedSuccess = 204,
  createdSuccess = 201,
  notFound = 404,
  oldPassWrong = 403,
  notFoundForFavs = 422,
  alreadyExist = 409,
}

export enum ResMsg {
  notFound = 'with provided ID does not exist in collection',
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

export enum FavsResMsg {
  notFound = 'with provided ID does not exist in collection',
  notFavoriteEntity = "with provided ID isn't favorite",
}
