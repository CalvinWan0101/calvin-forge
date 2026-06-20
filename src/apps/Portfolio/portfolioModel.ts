import { purchaseHistory } from '../../data/data'

type SummaryCardItem = {
  label: string
  value: string
  unit: string
  active?: boolean
}

export type ChartPoint = {
  id: string
  date: string
  timestamp: number
  price: number
  sharesLabel: string
  priceLabel: string
  deltaFromAverage: number
}

type ParsedPurchaseRecord = {
  id: string
  date: string
  shares: number
  price: number
  timestamp: number
  month: number
  monthKey: string
  monthLabel: string
  sharesLabel: string
  priceLabel: string
  investedLabel: string
}

export const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

const purchasePriceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 6,
  maximumFractionDigits: 6,
})

const sharesFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 5,
  maximumFractionDigits: 5,
  useGrouping: false,
})

export const axisValueFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
})

const percentFormatter = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const describeDeltaFromAverage = (delta: number) => {
  if (Math.abs(delta) < 0.005) {
    return '與平均成本幾乎持平'
  }

  const formattedDelta = `${percentFormatter.format(Math.abs(delta))}%`

  return delta > 0 ? `比平均成本高 ${formattedDelta}` : `比平均成本低 ${formattedDelta}`
}

const createMonthName = (month: number) =>
  ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'][
    month - 1
  ]

const createMonthKey = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  return `${year}-${month}`
}

const createMonthLabel = (date: Date) => `${date.getFullYear()} 年 ${date.getMonth() + 1} 月`

const formatPurchaseDate = (date: Date) => {
  const year = date.getFullYear()
  const month = `${date.getMonth() + 1}`.padStart(2, '0')
  const day = `${date.getDate()}`.padStart(2, '0')
  return `${year}/${month}/${day}`
}

const getNiceStep = (value: number) => {
  if (!Number.isFinite(value) || value <= 0) {
    return 1
  }

  const magnitude = 10 ** Math.floor(Math.log10(value))
  const normalized = value / magnitude

  if (normalized <= 1) return magnitude
  if (normalized <= 2) return 2 * magnitude
  if (normalized <= 5) return 5 * magnitude
  return 10 * magnitude
}

const desiredYAxisTickCount = 8

export const purchaseEntries: ParsedPurchaseRecord[] = purchaseHistory.map((purchaseRecord, recordIndex) => {
  const date = purchaseRecord.date
  const dateLabel = formatPurchaseDate(date)
  const monthKey = createMonthKey(date)

  return {
    id: `${monthKey}-${dateLabel}-${purchaseRecord.shares}-${purchaseRecord.price}-${recordIndex}`,
    date: dateLabel,
    shares: purchaseRecord.shares,
    price: purchaseRecord.price,
    timestamp: date.getTime(),
    month: date.getMonth() + 1,
    monthKey,
    monthLabel: createMonthLabel(date),
    sharesLabel: sharesFormatter.format(purchaseRecord.shares),
    priceLabel: purchasePriceFormatter.format(purchaseRecord.price),
    investedLabel: currencyFormatter.format(purchaseRecord.shares * purchaseRecord.price),
  }
})

const chartEntries = [...purchaseEntries].sort((left, right) => left.timestamp - right.timestamp)

const totalShares = purchaseEntries.reduce((sum, entry) => sum + entry.shares, 0)
const totalInvested = purchaseEntries.reduce((sum, entry) => sum + entry.shares * entry.price, 0)
export const averagePurchasePrice = totalShares === 0 ? 0 : totalInvested / totalShares

const firstChartEntry = chartEntries[0]
const lastChartEntry = chartEntries[chartEntries.length - 1]
const chartStartDate = firstChartEntry
  ? new Date(new Date(firstChartEntry.timestamp).getFullYear(), new Date(firstChartEntry.timestamp).getMonth(), 1)
  : new Date()
const chartEndDate = lastChartEntry
  ? new Date(new Date(lastChartEntry.timestamp).getFullYear(), new Date(lastChartEntry.timestamp).getMonth() + 1, 0)
  : new Date(chartStartDate)
export const purchaseChartDomain = [chartStartDate.getTime(), chartEndDate.getTime()] as const
const minPrice = Math.min(...chartEntries.map((entry) => entry.price))
const maxPrice = Math.max(...chartEntries.map((entry) => entry.price))
const rawYAxisStep =
  chartEntries.length > 1 ? (maxPrice - minPrice) / Math.max(desiredYAxisTickCount - 1, 1) : maxPrice || 1
const yAxisStep = getNiceStep(rawYAxisStep)
export const yAxisMin = Math.floor(minPrice / yAxisStep) * yAxisStep
export const yAxisMax = Math.ceil(maxPrice / yAxisStep) * yAxisStep || yAxisStep

export const purchaseChartData: ChartPoint[] = chartEntries.map((entry) => ({
  id: entry.id,
  date: entry.date,
  timestamp: entry.timestamp,
  price: entry.price,
  sharesLabel: entry.sharesLabel,
  priceLabel: entry.priceLabel,
  deltaFromAverage: averagePurchasePrice === 0 ? 0 : ((entry.price - averagePurchasePrice) / averagePurchasePrice) * 100,
}))

const yAxisValues: number[] = []
for (let value = yAxisMin; value <= yAxisMax + yAxisStep / 2; value += yAxisStep) {
  yAxisValues.push(Number(value.toFixed(4)))
}

export const yAxisTicks = yAxisValues

const monthStarts: Date[] = []
if (firstChartEntry && lastChartEntry) {
  const cursor = new Date(chartStartDate)
  const endMonth = new Date(chartEndDate.getFullYear(), chartEndDate.getMonth(), 1)

  while (cursor <= endMonth) {
    monthStarts.push(new Date(cursor))
    cursor.setMonth(cursor.getMonth() + 1)
  }
}

export const monthMarkers: number[] = monthStarts
  .slice(1)
  .map((monthStart) => monthStart.getTime())
  .filter((timestamp) => timestamp >= chartStartDate.getTime() && timestamp <= chartEndDate.getTime())

export const monthLabels = monthStarts.map((monthStart) => {
  const monthStartTimestamp = Math.max(monthStart.getTime(), chartStartDate.getTime())
  const nextMonthStart = new Date(monthStart.getFullYear(), monthStart.getMonth() + 1, 1).getTime()
  const monthEndTimestamp = Math.min(nextMonthStart, chartEndDate.getTime())
  const midpoint = monthStartTimestamp + (monthEndTimestamp - monthStartTimestamp) / 2

  return {
    timestamp: midpoint,
    label: createMonthName(monthStart.getMonth() + 1),
  }
})

export const summaryCards: SummaryCardItem[] = [
  {
    label: '持有股數',
    value: sharesFormatter.format(totalShares),
    unit: 'VT',
  },
  {
    label: '平均購入價格',
    value: currencyFormatter.format(averagePurchasePrice),
    unit: 'USD',
  },
  {
    label: '總投入金額',
    value: currencyFormatter.format(totalInvested),
    unit: '進行中',
    active: true,
  },
]

export const historyMonthOptions = Array.from(
  new Map(purchaseEntries.map((entry) => [entry.monthKey, entry.monthLabel])).entries(),
).map(([value, label]) => ({
  value,
  label,
}))
