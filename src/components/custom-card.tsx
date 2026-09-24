import { MagicCard } from "./ui/magic-card"
import { Badge } from "./ui/badge"
import type { List, OpenWeatherApiResponse } from "@/lib/interfaces"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "@tanstack/react-router"

function selectDailyForecasts(list: List[]): List[] {
  const byDate = new Map<string, List>()
  for (const entry of list) {
    const date = entry.dt_txt.slice(0, 10)
    if (!byDate.has(date) || entry.dt_txt.endsWith("12:00:00")) {
      byDate.set(date, entry)
    }
  }
  return [...byDate.values()].slice(0, 5)
}

export default function CustomCard({
  data,
  description,
}: Readonly<{
  data: OpenWeatherApiResponse
  description: string
}>) {
  const dailyForecasts = selectDailyForecasts(data.list)
  const { theme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted
    ? (theme === "system" ? systemTheme : theme) === "dark"
    : true
  return (
    <Card className="w-full min-w-xl border-none p-0 shadow-none">
      <MagicCard
        mode="orb"
        glowFrom={isDark ? "#ee4f27" : "#E9D5FF"}
        glowTo={isDark ? "#6b21ef" : "#FBCFE8"}
        className="h-full w-full py-4"
      >
        <div className="flex w-full justify-between">
          <CardHeader className="flex w-full justify-between">
            <CardTitle>{data.city.name}</CardTitle>
            <CardDescription className="mt-1">
              <Badge>{description}</Badge>
            </CardDescription>
          </CardHeader>
        </div>
        <div className="flex flex-1 flex-col gap-3 px-2">
          {dailyForecasts.map((day) => (
            <div key={day.dt}>
              <div className="flex items-center gap-3"></div>
              <CardContent className="space-y-2 px-4 py-1">
                <div className="flex w-full flex-col gap-1">
                  <div className="flex w-full justify-between">
                    <span className="typeset typeset-mono">{day.dt_txt}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="typeset typeset-large">
                      {(day.main.temp - 273.15).toFixed(2)}
                    </span>
                    <span className="typeset typeset-c">°C</span>
                    <div className="flex flex-col justify-center">
                      <span className="typeset-size">
                        Ressenti: {(day.main.feels_like - 273.15).toFixed(2)}°C
                      </span>
                      <span className="typeset-size">
                        Max: {(day.main.temp_max - 273.15).toFixed(2)} / Min{" "}
                        {(day.main.temp_min - 273.15).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge>{(day.wind.speed * 3.6).toFixed(2)}km/h</Badge>
                    <Badge>hum. {day.main.humidity}%</Badge>
                    {day.rain ? <Badge>rain: {day.rain["3h"]}%</Badge> : null}
                  </div>
                </div>
              </CardContent>
            </div>
          ))}
        </div>
      </MagicCard>
    </Card>
  )
}
