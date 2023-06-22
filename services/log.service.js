import chalk from "chalk"
import dedent from "dedent-js"

export const printError = (error) => console.log(chalk.bgRed("ERROR: "), error)

export const printSuccess = (msg) =>
  console.log(chalk.bgGreen("SUCCESS: "), msg)

export const printHelp = () =>
  console.log(
    dedent(`
  ${chalk.bgCyan("HELP: ")}
  Without Args - Weather Output
  -c [CITY] - if you want set city
  -h - if you want to see help
  -t [API_KEY] - if you want to save token
  `)
  )

export const printWeather = (data, icon) =>
  console.log(
    dedent(`
  ${chalk.bgYellow("WEATHER: ")} The weather in ${data.name} city
  ${icon} ${data.weather[0].description}
  Temperature: ${data.main.temp} (feels like ${data.main.feels_like})
  Humidity: ${data.main.humidity}%
  Wind Speed: ${data.wind.speed}
`)
  )
