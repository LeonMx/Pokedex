import { theme } from 'twin.macro'
import { STATS } from './constants'

export const mockConsoleMethod = (
  realConsoleMethod: CallableFunction
): ((message: string) => void) => {
  const ignoredMessages = ['test was not wrapped in act(...)']

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (message: string, ...args: any[]) => {
    const containsIgnoredMessage = ignoredMessages.some((ignoredMessage) =>
      message.includes(ignoredMessage)
    )

    if (!containsIgnoredMessage) {
      realConsoleMethod && realConsoleMethod(message, ...args)
    }
  }
}

export const calculateStatPoints = (
  name: string,
  baseStat: number
): {
  baseStat: number
  percentage: number
  minPoint: number
  maxPoint: number
} => {
  /* 
    For calculate max and min stat points:
  
    Formula for hp:
    max: BaseStat x 2 + 204
    min: BaseStat x 2 + 110

    Formula for other stats:
    max: ( BaseStat x 2 + 99 ) x 1.1
    min: ( BaseStat x 2 + 5 ) x 0.9

    https://bulbapedia.bulbagarden.net/wiki/Stat#Base_stats
  */
  const minPoint = name === STATS.HP ? baseStat * 2 + 110 : (baseStat * 2 + 5) * 0.9
  const maxPoint = name === STATS.HP ? baseStat * 2 + 204 : (baseStat * 2 + 99) * 1.1
  const percentage = (baseStat / 180) * 100
  return { baseStat, percentage, minPoint, maxPoint }
}

const statColor = {
  low: theme`colors.red.500`,
  neutral: theme`colors.yellow.300`,
  high: theme`colors.green.500`,
  highest: theme`colors.blue.500`,
}

export const getColorBaseStat = (baseStat: number): string => {
  if (baseStat < 50) return statColor.low

  if (baseStat < 100) return statColor.neutral

  if (baseStat < 150) return statColor.high

  return statColor.highest
}

export const getUnit = (num: number): string => (num * 0.1).toFixed(2)
