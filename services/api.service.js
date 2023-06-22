import axios from "axios"
import dotenv from "dotenv"
import { getKeyValue, TOKEN_DICTIONARY } from "./storage.service.js"

dotenv.config()

export const getIcon = (icon) => {
  switch (icon.slice(0, -1)) {
    case "01":
      return "☀️"
    case "02":
      return "🌤️"
    case "03":
      return "☁️"
    case "04":
      return "☁️"
    case "09":
      return "🌧️"
    case "10":
      return "🌦️"
    case "11":
      return "🌩️"
    case "13":
      return "❄️"
    case "50":
      return "🌫️"
  }
}

export const getWeather = async (city) => {
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.TOKEN))
  if (!token) {
    throw new Error("token is null, add it using -t flag")
  }

  const { data } = await axios({
    url: "https://api.openweathermap.org/data/2.5/weather",
    method: "GET",
    params: {
      q: city,
      appid: token,
      units: "metric",
    },
  })

  return data
}
