import {
  CartesianGrid,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import styled from 'styled-components'
import {
  averagePurchasePrice,
  axisValueFormatter,
  currencyFormatter,
  describeDeltaFromAverage,
  monthLabels,
  monthMarkers,
  purchaseChartData,
  purchaseChartDomain,
  type ChartPoint,
  yAxisMax,
  yAxisMin,
  yAxisTicks,
} from '../portfolioModel'
import { SectionTitle, SurfaceCard } from './shared'

export const PurchaseChart = () => (
  <ChartCard>
    <CardTitleRow>
      <SectionTitle>購入單價走勢</SectionTitle>
      <Legend>
        <LegendItem>
          <LegendLine />
          購入單價
        </LegendItem>
        <LegendItem>
          <LegendDashed />
          平均 {currencyFormatter.format(averagePurchasePrice)}
        </LegendItem>
      </Legend>
    </CardTitleRow>

    <ChartFrame aria-label="VT 購入單價走勢圖" role="img">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={purchaseChartData} margin={{ top: 12, right: 20, bottom: 12, left: 0 }}>
          <CartesianGrid stroke="rgba(140,46,46,0.1)" vertical={false} />
          {monthMarkers.map((marker) => (
            <ReferenceLine
              key={marker}
              x={marker}
              stroke="rgba(140,46,46,0.24)"
              strokeDasharray="3 2"
              ifOverflow="visible"
            />
          ))}
          <XAxis
            dataKey="timestamp"
            type="number"
            scale="time"
            domain={[purchaseChartDomain[0], purchaseChartDomain[1]]}
            ticks={monthLabels.map((month) => month.timestamp)}
            tickFormatter={formatMonthTick}
            axisLine={{ stroke: 'rgba(140,46,46,0.25)', strokeWidth: 1.5 }}
            tickLine={{ stroke: 'rgba(140,46,46,0.3)' }}
            tick={axisTickStyle}
            interval={0}
            minTickGap={4}
          />
          <YAxis
            dataKey="price"
            domain={[yAxisMin, yAxisMax]}
            ticks={yAxisTicks}
            tickFormatter={(value) => axisValueFormatter.format(value)}
            axisLine={{ stroke: 'rgba(140,46,46,0.25)', strokeWidth: 1.5 }}
            tickLine={false}
            tick={axisTickStyle}
            width={50}
          />
          <Tooltip cursor={{ stroke: 'rgba(140,46,46,0.22)', strokeWidth: 1 }} content={<ChartTooltip />} />
          <ReferenceLine
            y={averagePurchasePrice}
            stroke="rgba(62,50,44,0.35)"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            ifOverflow="visible"
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#8c2e2e"
            strokeWidth={2}
            dot={{ r: 3.5, fill: '#8c2e2e', strokeWidth: 0 }}
            activeDot={{ r: 5, fill: '#8c2e2e', stroke: 'rgba(140,46,46,0.18)', strokeWidth: 8 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartFrame>
  </ChartCard>
)

const axisTickStyle = {
  fill: 'rgba(62,50,44,0.5)',
  fontSize: 10,
  fontWeight: 700,
}

const formatMonthTick = (timestamp: number) => {
  const monthLabel = monthLabels.find((month) => month.timestamp === timestamp)

  return monthLabel?.label ?? ''
}

type ChartTooltipProps = {
  active?: boolean
  payload?: Array<{
    payload: ChartPoint
  }>
}

const ChartTooltip = ({ active, payload }: ChartTooltipProps) => {
  if (!active || !payload?.[0]) {
    return null
  }

  const point = payload[0].payload

  return (
    <TooltipCard>
      <TooltipDate>{point.date}</TooltipDate>
      <TooltipPrice>{`當次買入價 ${point.priceLabel}`}</TooltipPrice>
      <TooltipMeta>{`買入 ${point.sharesLabel} 股`}</TooltipMeta>
      <TooltipDelta $positive={point.deltaFromAverage >= 0}>
        {describeDeltaFromAverage(point.deltaFromAverage)}
      </TooltipDelta>
    </TooltipCard>
  )
}

const ChartCard = styled(SurfaceCard)`
  padding: 1.5rem;
`

const CardTitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1.25rem;
`

const Legend = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1.25rem;
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.08em;
`

const LegendItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
`

const LegendLine = styled.span`
  display: inline-block;
  width: 18px;
  height: 2px;
  background: var(--accent);
`

const LegendDashed = styled.span`
  display: inline-block;
  width: 18px;
  height: 0;
  border-top: 2px dashed var(--text-muted);
`

const ChartFrame = styled.div`
  width: 100%;
  height: 215px;

  .recharts-wrapper,
  .recharts-surface {
    overflow: visible;
  }
`

const TooltipCard = styled.div`
  min-width: 168px;
  border: 1px solid rgba(140, 46, 46, 0.18);
  border-radius: 2px;
  background: rgba(253, 252, 248, 0.97);
  padding: 0.65rem 0.75rem;
  box-shadow: 0 14px 26px rgba(62, 50, 44, 0.12);
`

const TooltipDate = styled.div`
  color: rgba(62, 50, 44, 0.62);
  font-size: 0.55rem;
  font-weight: 700;
  letter-spacing: 0.03em;
`

const TooltipPrice = styled.div`
  margin-top: 0.3rem;
  color: rgba(24, 19, 16, 0.92);
  font-size: 0.76rem;
  font-weight: 900;
`

const TooltipMeta = styled.div`
  margin-top: 0.3rem;
  color: rgba(62, 50, 44, 0.66);
  font-size: 0.58rem;
  font-weight: 600;
`

const TooltipDelta = styled.div<{ $positive: boolean }>`
  margin-top: 0.35rem;
  color: ${({ $positive }) => ($positive ? 'var(--accent)' : '#2b6d44')};
  font-size: 0.58rem;
  font-weight: 700;
`
