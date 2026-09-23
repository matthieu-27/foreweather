import { div } from "framer-motion/client"
import { MagicCard } from "./ui/magic-card"
import { Badge } from "./ui/badge"

interface CustomCardProps {
  city: string
  temp: number
  min: number
  max: number
  wind: number
  hum: number
  feel: number
  long: number
  lag: number
  day: Date
  desc: string
  rain: number
}

export default function CustomCard({ data }: { data: CustomCardProps }) {
  return (
    <div className="">
      <MagicCard>
        <div className="flex w-full justify-between">
          <span className="typeset typeset-heading">{data.city}</span>
          <Badge>{data.feel}</Badge>
        </div>
        <div className="typeset typeset-mono">
          FR - {data.lag} {data.long}
        </div>
        <div className="mr-12 flex w-full flex-col">
          <div className="typeset">
            <span className="typeset-temp">{data.temp}</span>
            <span className="typeset-leading">°C</span>
          </div>
          <div className="typeset">
            <span className="typeset-size">Ressenti: {data.feel}°C</span>
            <span className="typeset-size">
              Max: {data.max} / Min {data.min}
            </span>
          </div>
          <div>
            <Badge>{data.wind}km/h</Badge>
            <Badge>hum. {data.hum}%</Badge>
            <Badge>rain: {data.rain}%</Badge>
          </div>
        </div>
      </MagicCard>
    </div>
  )
}
