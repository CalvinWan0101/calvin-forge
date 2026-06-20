import { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styled from 'styled-components'
import { historyMonthOptions, purchaseEntries } from '../portfolioModel'
import { SectionTitle, SurfaceCard } from './shared'

const historyPageSize = 5
const allMonthsValue = 'all'
const allMonthsLabel = '全部月份'

export const PurchaseHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState(allMonthsValue)
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1)

  const filteredHistoryEntries = purchaseEntries.filter((entry) =>
    selectedMonth === 'all' ? true : entry.monthKey === selectedMonth,
  )
  const historyPageCount = Math.max(1, Math.ceil(filteredHistoryEntries.length / historyPageSize))
  const safeCurrentHistoryPage = Math.min(currentHistoryPage, historyPageCount)
  const historyPageStart = (safeCurrentHistoryPage - 1) * historyPageSize
  const paginatedHistoryEntries = filteredHistoryEntries.slice(historyPageStart, historyPageStart + historyPageSize)
  const paddedHistoryEntries = Array.from({ length: historyPageSize }, (_, index) => paginatedHistoryEntries[index] ?? null)
  const selectedMonthLabel =
    selectedMonth === allMonthsValue
      ? allMonthsLabel
      : historyMonthOptions.find((option) => option.value === selectedMonth)?.label ?? allMonthsLabel

  return (
    <HistoryCard>
      <HistoryHeader>
        <SectionTitle>購入紀錄</SectionTitle>
        <SelectWrap>
          <MonthSelect
            id="portfolio-history-month"
            aria-label="月份篩選"
            value={selectedMonth}
            onChange={(event) => {
              setSelectedMonth(event.target.value)
              setCurrentHistoryPage(1)
            }}
          >
            <option value={allMonthsValue}>{allMonthsLabel}</option>
            {historyMonthOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </MonthSelect>
        </SelectWrap>
      </HistoryHeader>

      <TableScroll>
        <Table>
          <thead>
            <tr>
              <TableHeadCell>日期</TableHeadCell>
              <TableHeadCell>購入股數</TableHeadCell>
              <TableHeadCell>單價 (USD)</TableHeadCell>
              <TableHeadCell>投入金額</TableHeadCell>
            </tr>
          </thead>
          <tbody>
            {paddedHistoryEntries.map((entry, index) => (
              <TableRow key={entry ? entry.id : `empty-row-${index}`}>
                <DateCell>{entry?.date ?? '\u00A0'}</DateCell>
                <SharesCell>{entry?.sharesLabel ?? '\u00A0'}</SharesCell>
                <TableCell>{entry?.priceLabel ?? '\u00A0'}</TableCell>
                <TableCell>{entry?.investedLabel ?? '\u00A0'}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </TableScroll>

      <PaginationBar>
        <PaginationStatus>
          {filteredHistoryEntries.length === 0
            ? `${selectedMonthLabel} 目前沒有符合條件的購買紀錄`
            : historyPageCount > 1
              ? `共 ${filteredHistoryEntries.length} 筆・第 ${safeCurrentHistoryPage} / ${historyPageCount} 頁`
              : `共 ${filteredHistoryEntries.length} 筆`}
        </PaginationStatus>
        <PaginationControls>
          {historyPageCount > 1 && (
            <PaginationButton
              type="button"
              aria-label="上一頁"
              disabled={safeCurrentHistoryPage === 1}
              onClick={() => setCurrentHistoryPage((page) => Math.max(1, page - 1))}
            >
              <FiChevronLeft />
              上一頁
            </PaginationButton>
          )}
          {historyPageCount > 1 && (
            <PaginationButton
              type="button"
              aria-label="下一頁"
              disabled={safeCurrentHistoryPage === historyPageCount}
              onClick={() => setCurrentHistoryPage((page) => Math.min(historyPageCount, page + 1))}
            >
              下一頁
              <FiChevronRight />
            </PaginationButton>
          )}
        </PaginationControls>
      </PaginationBar>
    </HistoryCard>
  )
}

const HistoryCard = styled(SurfaceCard)`
  overflow: hidden;
  animation-delay: 0.24s;
`

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-soft);
`

const SelectWrap = styled.div`
  position: relative;
  display: inline-flex;

  @media (max-width: 720px) {
    flex: 1;
    min-width: 0;
  }
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    right: 1rem;
    width: 0.35rem;
    height: 0.35rem;
    border-right: 1.5px solid currentColor;
    border-bottom: 1.5px solid currentColor;
    pointer-events: none;
    transform: translateY(-70%) rotate(45deg);
  }
`

const MonthSelect = styled.select`
  appearance: none;
  display: inline-flex;
  min-height: 2.25rem;
  padding: 0.45rem 2rem 0.45rem 1rem;
  border: 1px solid rgba(23, 30, 28, 0.14);
  border-radius: 999px;
  background: rgba(244, 241, 225, 0.98);
  color: inherit;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  @media (max-width: 720px) {
    width: 100%;
    min-width: 0;
  }

  &:hover {
    background: rgba(180, 99, 62, 0.12);
    color: var(--accent);
  }
`

const TableScroll = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: left;
`

const TableHeadCell = styled.th`
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.75rem 1.5rem;
  background: var(--bg);
  border-bottom: 1px solid var(--border-soft);
  color: var(--text-muted);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
  width: 25%;
`

const TableCell = styled.td`
  padding: 0.9rem 1.5rem;
  height: 3.5rem;
  border-bottom: 1px solid rgba(62, 50, 44, 0.07);
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  vertical-align: middle;
  white-space: nowrap;
`

const DateCell = styled(TableCell)`
  color: var(--text-muted);
  font-weight: 700;
`

const SharesCell = styled(TableCell)`
  font-weight: 900;
`

const TableRow = styled.tr`
  &:last-child td {
    border-bottom: none;
  }

  &:hover {
    background: rgba(140, 46, 46, 0.04);
  }
`

const PaginationBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.9rem;
  padding: 1rem 1.5rem 1.2rem;
  border-top: 1px solid var(--border-soft);

  @media (max-width: 720px) {
    flex-direction: column;
    align-items: stretch;
    padding: 0.9rem 1rem 1rem;
  }
`

const PaginationStatus = styled.div`
  color: var(--text-muted);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;

  @media (max-width: 720px) {
    text-align: center;
  }
`

const PaginationControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;

  @media (max-width: 720px) {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 0.5rem;
  }
`

const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.3rem;
  padding: 0.45rem 0.75rem;
  border: 1px solid rgba(140, 46, 46, 0.18);
  background: rgba(253, 252, 248, 0.92);
  color: var(--text);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;

  &:hover:not(:disabled) {
    border-color: var(--accent);
    color: var(--accent);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (max-width: 720px) {
    width: 100%;
    min-width: 0;
    padding-inline: 0.5rem;
    white-space: nowrap;
  }
`
