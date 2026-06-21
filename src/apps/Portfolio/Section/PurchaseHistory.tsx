import { useEffect, useRef, useState } from 'react'
import { FiChevronDown, FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import styled from 'styled-components'
import { historyMonthOptions, purchaseEntries } from '../portfolioModel'
import { SectionTitle, SurfaceCard } from './shared'

const historyPageSize = 5
const allMonthsValue = 'all'
const allMonthsLabel = '全部月份'

export const PurchaseHistory = () => {
  const [selectedMonth, setSelectedMonth] = useState(allMonthsValue)
  const [currentHistoryPage, setCurrentHistoryPage] = useState(1)
  const [isMonthMenuOpen, setIsMonthMenuOpen] = useState(false)
  const monthMenuRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!isMonthMenuOpen) {
      return
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!monthMenuRef.current?.contains(event.target as Node)) {
        setIsMonthMenuOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMonthMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMonthMenuOpen])

  const monthOptions = historyMonthOptions

  return (
    <HistoryCard>
      <HistoryHeader>
        <SectionTitle>購入紀錄</SectionTitle>
        <MonthDropdown ref={monthMenuRef}>
          <MonthDropdownButton
            type="button"
            aria-label="月份篩選"
            aria-haspopup="listbox"
            aria-expanded={isMonthMenuOpen}
            aria-controls="portfolio-history-month-menu"
            onClick={() => setIsMonthMenuOpen((open) => !open)}
          >
            {selectedMonthLabel}
            <MonthDropdownIcon aria-hidden="true" $isOpen={isMonthMenuOpen}>
              <FiChevronDown />
            </MonthDropdownIcon>
          </MonthDropdownButton>
          <MonthMenu id="portfolio-history-month-menu" role="listbox" $isOpen={isMonthMenuOpen}>
            {monthOptions.map((option) => (
              <MonthOption
                key={option.value}
                type="button"
                role="option"
                aria-selected={selectedMonth === option.value}
                $isActive={selectedMonth === option.value}
                onClick={() => {
                  setSelectedMonth(option.value)
                  setCurrentHistoryPage(1)
                  setIsMonthMenuOpen(false)
                }}
              >
                {option.label}
              </MonthOption>
            ))}
          </MonthMenu>
        </MonthDropdown>
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
  overflow: visible;
  animation-delay: 0.24s;
`

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--border-soft);

  @media (max-width: 720px) {
    align-items: center;
    padding: 1rem;
  }
`

const MonthDropdown = styled.div`
  position: relative;
  display: inline-flex;
  justify-content: flex-end;
  width: 8.5rem;
  flex-shrink: 0;

  @media (max-width: 720px) {
    width: 8.5rem;
    max-width: 100%;
    align-self: flex-end;
  }
`

const MonthDropdownButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.4rem;
  width: 100%;
  min-height: 2.25rem;
  padding: 0.45rem 0.75rem 0.45rem 1rem;
  border: 1px solid rgba(23, 30, 28, 0.14);
  border-radius: 999px;
  background: rgba(244, 241, 225, 0.98);
  color: inherit;
  font: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  @media (max-width: 720px) {
    min-width: 0;
  }

  &:hover {
    background: rgba(180, 99, 62, 0.12);
    color: var(--accent);
  }
`

const MonthDropdownIcon = styled.span<{ $isOpen: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.2s ease;
`

const MonthMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: calc(100% + 0.75rem);
  right: 0;
  z-index: 5;
  box-sizing: border-box;
  width: 100%;
  max-height: 16rem;
  overflow-y: auto;
  scrollbar-width: none;
  padding: 0.65rem;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.25rem;
  border: 1px solid rgba(23, 30, 28, 0.14);
  border-radius: 1.25rem;
  background: rgba(244, 241, 225, 0.98);
  box-shadow: 0 1rem 2.5rem rgba(23, 30, 28, 0.12);
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-0.5rem)')};
  pointer-events: ${({ $isOpen }) => ($isOpen ? 'auto' : 'none')};
  transition: opacity 0.2s ease, transform 0.2s ease;

  &::-webkit-scrollbar {
    display: none;
  }
`

const MonthOption = styled.button<{ $isActive: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  align-self: stretch;
  padding: 0.5rem 0.75rem;
  border: 0;
  border-radius: 999px;
  background: ${({ $isActive }) => ($isActive ? 'rgba(180, 99, 62, 0.12)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'var(--accent)' : 'inherit')};
  font: inherit;
  font-size: 0.875rem;
  font-weight: 700;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

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
