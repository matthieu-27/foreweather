import { createFileRoute } from "@tanstack/react-router"
import { Button } from "@/components/ui/button"
import { MagicCard } from "@/components/ui/magic-card"
import { useState } from "react"

export const Route = createFileRoute("/")({ component: App })

interface OpenWeatherApiResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

interface Sys {
  type: number
  id: number
  country: string
  sunrise: number
  sunset: number
}

interface Clouds {
  all: number
}

interface Wind {
  speed: number
  deg: number
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Coord {
  lon: number
  lat: number
}

interface City {
  name: string
  location: number[]
}

const CITIES: City[] = [
  {
    name: "Toulouse",
    location: [43.6, 1.433333],
  },
  {
    name: "Saint Geours De Maremne",
    location: [43.683331, -1.23333],
  },
  {
    name: "Mérignac",
    location: [44.836151, -0.580816],
  },
]

async function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="typeset typeset-docs flex min-w-0 flex-col gap-4 leading-loose"></div>
    </div>
  )
}
