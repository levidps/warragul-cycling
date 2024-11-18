export type TRide = {
  name: string,
  location: string,
  day: number,
  start: number,
  description: string,
  distance?: number,
  route?: string,
  speed?:number,
  speed_max?: number,
  speed_min?: number
}

export const data: TRide[] = [
  {
    "name": "5:50am",
    "location": "Warragul Watch Tower",
    "day": 2,
    "start": 5.50,
    "route": "",
    "speed": 32,
    "distance": 50,
    "speed_max": 34,
    "speed_min": 30,
    "description": "Steady \"B\" pace group ride."
  },
  {
    "name": "6am",
    "location": "Warragul Watch Tower",
    "day": 2,
    "start": 6,
    "route": "",
    "distance": 50,
    "speed": 34,
    "speed_max": 36,
    "speed_min": 32,
    "description": "Steady \"A\" pace group ride."
  },
  {
    "name": "Mount Worth",
    "location": "Warragul Watch Tower",
    "day": 3,
    "start": 6,
    "route": "",
    "distance": 40,
    "description": "Comfortable \"Zone 2\" pace out to Mount Worth, free for all to the top and decent. Regroup at the bottom for a casual return."
  },
  {
    "name": "5:50am",
    "location": "Warragul Watch Tower",
    "day": 4,
    "start": 5.50,
    "route": "",
    "speed": 32,
    "distance": 50,
    "speed_max": 34,
    "speed_min": 30,
    "description": "Steady \"B\" pace group ride."
  },
  {
    "name": "6am",
    "location": "Warragul Watch Tower",
    "day": 4,
    "start": 6,
    "route": "",
    "distance": 50,
    "speed": 34,
    "speed_max": 36,
    "speed_min": 32,
    "description": "Steady \"A\" pace group ride."
  },
  {
    "name": "Drouin Saturday",
    "location": "Drouin - near Middels",
    "day": 6,
    "start": 8,
    "route": "",
    "distance": 40,
    "speed": 25,
    "description": "Comfortable pace group ride, coffee at Middels after."
  },
  {
    "name": "Darnum Saturday Ride (DSR)",
    "location": "Darnum Tea Rooms",
    "day": 6,
    "start": 8.5,
    "route": "",
    "distance": 55,
    "speed": 26,
    "description": "Inclusive group ride starting from the Darnum Tea rooms and riding for 55km. Make note that on the last Saturday of the month the ride goes out to Westbury for 80km"
  },
  {
    "name": "7am (Pre-World Champs)",
    "location": "Warragul Watch Tower",
    "day": 0,
    "start": 7,
    "distance": 30,
    "speed": 30,
    "description": "Zone 2 warm up ride for Sunday World Champs"
  },
  {
    "name": "10 to 8",
    "location": "Warragul Watch Tower",
    "day": 0,
    "start": 7.5,
    "distance": 40,
    "speed": 28,
    "speed_max": 30,
    "speed_min": 26,
    "description": "Inclusive group ride, has sped up in recent "
  },
  {
    "name": "World Champs",
    "location": "Warragul Watch Tower",
    "day": 0,
    "start": 8,
    "distance": 50,
    "speed": 34,
    "speed_max": 36,
    "speed_min": 33,
    "description": "IYKYK - quick paced ride, one re-group at the top of Shady Creek hills before riding down to Yarragon. Depending on who's there can be friendly rolling turns or fast paced with attacks and breaks, just have to show up and have a crack."
  }
];