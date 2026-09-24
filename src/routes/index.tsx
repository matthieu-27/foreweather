import { createFileRoute } from "@tanstack/react-router"
import { createServerFn, createServerOnlyFn } from "@tanstack/react-start"
import {
  QueryClient,
  QueryClientProvider,
  useQueries,
} from "@tanstack/react-query"
import type { OpenWeatherApiResponse } from "@/lib/interfaces"
import CustomCard from "@/components/custom-card"
import { ShootingStars } from "@/components/ui/shooting-stars"
import { StarsBackground } from "@/components/ui/stars-background"

const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast"

const apiKey = createServerOnlyFn(() => process.env.OPENWEATHER_API_KEY)

function buildUrl(lat: number, long: number) {
  return `${BASE_URL}?lat=${lat}&lon=${long}&appid=${apiKey()}`
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

const getForecast = createServerFn({ method: "GET" })
  .validator((data: { lat: number; long: number }) => data)
  .handler(async ({ data }): Promise<OpenWeatherApiResponse> => {
    const response = await fetch(buildUrl(data.lat, data.long))
    if (!response.ok) {
      throw new Error(
        `OpenWeather request failed with status ${response.status}`
      )
    }
    return response.json()
  })

const queryClient = new QueryClient()

function WeatherDashboard() {
  const results = useQueries({
    queries: CITIES.map((city) => ({
      queryKey: ["forecast", city.name],
      queryFn: () =>
        getForecast({
          data: { lat: city.location[0], long: city.location[1] },
        }),
    })),
  })

  return (
    <div className="relative flex min-h-svh w-full min-w-screen flex-col items-center justify-center rounded-md bg-neutral-900 p-6">
      <div className="typeset typeset-docs flex w-full min-w-0 justify-around gap-4 leading-loose">
        {results.map((result, idx) => {
          const city = CITIES[idx]
          if (result.isPending) {
            return <div key={city.name}>Loading {city.name}...</div>
          }
          if (result.isError) {
            return (
              <div key={city.name}>
                Failed to load {city.name}: {result.error.message}
              </div>
            )
          }
          return (
            <CustomCard
              key={city.name}
              data={result.data}
              description={result.data.list[0].weather[0].description}
            />
          )
        })}
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherDashboard />
    </QueryClientProvider>
  )
}

export const Route = createFileRoute("/")({ component: App })
