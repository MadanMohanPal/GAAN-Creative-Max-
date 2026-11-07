class Song {
  final String id;
  final String title;
  final String artistId;
  final String artistName;
  final String? albumId;
  final String? albumTitle;
  final String? genreId;
  final String? genreName;
  final int durationSeconds;
  final String audioUrl;
  final String coverUrl;
  final String? lyrics;
  final int playsCount;
  final int likesCount;
  final bool isExplicit;
  final String? language;

  const Song({
    required this.id,
    required this.title,
    required this.artistId,
    required this.artistName,
    this.albumId,
    this.albumTitle,
    this.genreId,
    this.genreName,
    required this.durationSeconds,
    required this.audioUrl,
    required this.coverUrl,
    this.lyrics,
    this.playsCount = 0,
    this.likesCount = 0,
    this.isExplicit = false,
    this.language,
  });

  factory Song.fromJson(Map<String, dynamic> json) {
    return Song(
      id: json['id'] as String,
      title: json['title'] as String,
      artistId: json['artist_id'] as String? ?? json['artistId'] as String? ?? '',
      artistName: json['artist_name'] as String? ?? json['artistName'] as String? ?? 'Unknown Artist',
      albumId: json['album_id'] as String? ?? json['albumId'] as String?,
      albumTitle: json['album_title'] as String? ?? json['albumTitle'] as String?,
      genreId: json['genre_id'] as String? ?? json['genreId'] as String?,
      genreName: json['genre_name'] as String? ?? json['genreName'] as String?,
      durationSeconds: json['duration_seconds'] as int? ?? json['durationSeconds'] as int? ?? 180,
      audioUrl: json['audio_url'] as String? ?? json['audioUrl'] as String? ?? '',
      coverUrl: json['cover_url'] as String? ?? json['coverUrl'] as String? ?? '',
      lyrics: json['lyrics'] as String?,
      playsCount: (json['plays_count'] ?? json['playsCount'] ?? 0) as int,
      likesCount: (json['likes_count'] ?? json['likesCount'] ?? 0) as int,
      isExplicit: json['is_explicit'] as bool? ?? json['isExplicit'] as bool? ?? false,
      language: json['language'] as String?,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'artist_id': artistId,
      'artist_name': artistName,
      'album_id': albumId,
      'album_title': albumTitle,
      'genre_id': genreId,
      'genre_name': genreName,
      'duration_seconds': durationSeconds,
      'audio_url': audioUrl,
      'cover_url': coverUrl,
      'lyrics': lyrics,
      'plays_count': playsCount,
      'likes_count': likesCount,
      'is_explicit': isExplicit,
      'language': language,
    };
  }
}

class Artist {
  final String id;
  final String name;
  final String bio;
  final String imageUrl;
  final String? headerUrl;
  final bool verified;
  final int monthlyListeners;

  const Artist({
    required this.id,
    required this.name,
    required this.bio,
    required this.imageUrl,
    this.headerUrl,
    this.verified = false,
    this.monthlyListeners = 0,
  });
}

class Album {
  final String id;
  final String title;
  final String artistId;
  final String? artistName;
  final String coverUrl;
  final String releaseDate;
  final String type;
  final int totalTracks;

  const Album({
    required this.id,
    required this.title,
    required this.artistId,
    this.artistName,
    required this.coverUrl,
    required this.releaseDate,
    this.type = 'album',
    this.totalTracks = 1,
  });
}

class Genre {
  final String id;
  final String name;
  final String slug;
  final String imageUrl;
  final int colorValue;

  const Genre({
    required this.id,
    required this.name,
    required this.slug,
    required this.imageUrl,
    required this.colorValue,
  });
}
