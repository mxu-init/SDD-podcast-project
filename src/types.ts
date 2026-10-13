export interface Episode {
  id: string;
  number: number;
  title: string;
  releaseDate: string;
  duration: string;
  shortDescription: string;
  longDescription: string;
  artwork: string;
  audio: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Host {
  name: string;
  bio: string;
  avatar: string;
}

export interface SiteIdentity {
  name: string;
  tagline: string;
  language: string;
  artwork: string;
  featuredEpisodeId: string;
  host: Host;
}
