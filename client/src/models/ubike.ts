export interface Ubike {
  sno: string
  sna: string
  tot: number
  sbi: number
  sarea: string
  mday: string
  lat: number
  lng: number
  ar: string
  sareaen: string
  snaen: string
  aren: string
  bemp: number
  act: string
  srcUpdateTime: string
  updateTime: string
  infoTime: string
  infoDate: string
}


export interface kaoUbike {
  data: {
    retVal: kao[];
  };
}

export interface kao {
  scity: string
  scityen: string
  sna: string
  sarea: string
  ar: string
  snaen: string
  sareaen: string
  aren: string
  sno: string
  tot: string
  sbi: string
  mday: string
  lat: string
  lng: string
  bemp: string
  act: number
}