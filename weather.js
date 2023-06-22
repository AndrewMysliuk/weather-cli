#!/usr/bin/env node
import { getArgs } from "./helpers/args.js"
import { getIcon, getWeather } from "./services/api.service.js"
import {
  printError,
  printHelp,
  printSuccess,
  printWeather,
} from "./services/log.service.js"
import { saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js"

const saveToken = async (token) => {
  try {
    if (!token.length) {
      printError("token is null")
      return
    }

    await saveKeyValue(TOKEN_DICTIONARY.TOKEN, token)
    printSuccess("Token has been saved")
  } catch (error) {
    printError(error.message)
  }
}

// const saveCity = async (city) => {
//   try {
//     if (!city.length) {
//       printError("token is null")
//       return
//     }

//     await saveKeyValue(TOKEN_DICTIONARY.CITY, city)
//     printSuccess("City has been saved")
//   } catch (error) {
//     printError(error.message)
//   }
// }

const getForcast = async (city) => {
  try {
    const weather = await getWeather(city)
    printWeather(weather, getIcon(weather.weather[0].icon))
  } catch (error) {
    if (error?.response?.status === 404) {
      printError("Wrong city")
    } else if (error?.response?.status === 401) {
      printError("Wrong token")
    } else {
      printError(error?.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.hasOwnProperty("h")) {
    printHelp()
  }
  if (args.hasOwnProperty("t")) {
    saveToken(args.t)
  }
  if (args.hasOwnProperty("c")) {
    // saveCity(args.c)
    getForcast(args.c)
    return
  }

  printError("use -c [CITY] flag for set city")
  return
}

initCLI()
