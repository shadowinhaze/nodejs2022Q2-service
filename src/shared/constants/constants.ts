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

export enum FavsResMsg {
  notFound = 'with provided ID does not exist in collection',
  notFavoriteEntity = "with provided ID isn't favorite",
}

export enum Entity {
  artists = 'artists',
  albums = 'albums',
  tracks = 'tracks',
  favorites = 'favorites',
  users = 'users',
}
