import type { City, Movie, Theatre, Show } from "./types";

export const cities: City[] = [
  { id: 1, name: "Coimbatore" },
  { id: 2, name: "Chennai" },
  { id: 3, name: "Madurai" },
  { id: 4, name: "Tiruchirappalli" },
  { id: 5, name: "Salem" },
];

export const movies: Movie[] = [
  {
    id: "leo",
    title: "Leo",
    description: "Parthiban is a mild-mannered cafe owner in Kashmir, who fends off a gang of murderous thugs and gains local fame. This brings him to the attention of a drug-dealing cartel who claim that he was once a part of them.",
    posterId: "leo",
  },
  {
    id: "vikram",
    title: "Vikram",
    description: "A special agent investigates a murder committed by a masked group of serial killers. However, a tangled maze of clues soon leads him to the drug kingpin of Chennai.",
    posterId: "vikram",
  },
  {
    id: "jailer",
    title: "Jailer",
    description: "A retired jailer goes on a manhunt to find his son's killers. But the road leads him to a familiar, albeit a bit darker, territory.",
    posterId: "jailer",
  },
  {
    id: "ponniyin-selvan",
    title: "Ponniyin Selvan: I",
    description: "Vandiyathevan, a brave and adventurous warrior, sets out to cross the Chola land to deliver a message from the crown prince Aditha Karikalan.",
    posterId: "ponniyin-selvan",
  },
  {
    id: "master",
    title: "Master",
    description: "An alcoholic professor is sent to a juvenile school, where he clashes with a ruthless gangster who uses the children for criminal activities.",
    posterId: "master",
  },
  {
    id: "soorarai-pottru",
    title: "Soorarai Pottru",
    description: "Maara, a man from a remote village, dreams of launching his own airline service. However, he must overcome several obstacles and challenges in order to be successful in his quest.",
    posterId: "soorarai-pottru",
  },
];

export const theatres: Theatre[] = [
  // Coimbatore
  { id: "th-cbe-1", name: "KG Cinemas", cityId: 1 },
  { id: "th-cbe-2", name: "Broadway Cinemas", cityId: 1 },
  { id: "th-cbe-3", name: "PVR: Brookefields", cityId: 1 },

  // Chennai
  { id: "th-chn-1", name: "Sathyam Cinemas", cityId: 2 },
  { id: "th-chn-2", name: "PVR: Grand Mall", cityId: 2 },
  { id: "th-chn-3", name: "AGS Cinemas", cityId: 2 },
];

export const shows: Show[] = [
  // Leo in Coimbatore
  { id: "sh-leo-cbe-1", movieId: "leo", theatreId: "th-cbe-1", time: "10:00 AM", price: 150 },
  { id: "sh-leo-cbe-2", movieId: "leo", theatreId: "th-cbe-1", time: "02:00 PM", price: 150 },
  { id: "sh-leo-cbe-3", movieId: "leo", theatreId: "th-cbe-2", time: "06:00 PM", price: 180 },
  { id: "sh-leo-cbe-4", movieId: "leo", theatreId: "th-cbe-2", time: "09:30 PM", price: 180 },
  
  // Vikram in Coimbatore
  { id: "sh-vik-cbe-1", movieId: "vikram", theatreId: "th-cbe-2", time: "10:00 AM", price: 170 },
  { id: "sh-vik-cbe-2", movieId: "vikram", theatreId: "th-cbe-2", time: "02:00 PM", price: 170 },
  { id: "sh-vik-cbe-3", movieId: "vikram", theatreId: "th-cbe-3", time: "06:00 PM", price: 200 },
  { id: "sh-vik-cbe-4", movieId: "vikram", theatreId: "th-cbe-3", time: "09:30 PM", price: 200 },

  // Jailer in Coimbatore
  { id: "sh-jai-cbe-1", movieId: "jailer", theatreId: "th-cbe-1", time: "10:30 AM", price: 160 },
  { id: "sh-jai-cbe-2", movieId: "jailer", theatreId: "th-cbe-3", time: "02:30 PM", price: 200 },

  // Ponniyin Selvan in Coimbatore
  { id: "sh-ps1-cbe-1", movieId: "ponniyin-selvan", theatreId: "th-cbe-3", time: "10:00 AM", price: 220 },
  { id: "sh-ps1-cbe-2", movieId: "ponniyin-selvan", theatreId: "th-cbe-3", time: "02:00 PM", price: 220 },

  // All movies in Chennai
  { id: "sh-leo-chn-1", movieId: "leo", theatreId: "th-chn-1", time: "10:00 AM", price: 250 },
  { id: "sh-vik-chn-1", movieId: "vikram", theatreId: "th-chn-2", time: "10:15 AM", price: 230 },
  { id: "sh-jai-chn-1", movieId: "jailer", theatreId: "th-chn-3", time: "10:30 AM", price: 200 },
  { id: "sh-ps1-chn-1", movieId: "ponniyin-selvan", theatreId: "th-chn-1", time: "11:00 AM", price: 300 },
  { id: "sh-mas-chn-1", movieId: "master", theatreId: "th-chn-2", time: "11:15 AM", price: 210 },
  { id: "sh-sp-chn-1", movieId: "soorarai-pottru", theatreId: "th-chn-3", time: "11:30 AM", price: 240 },
];
