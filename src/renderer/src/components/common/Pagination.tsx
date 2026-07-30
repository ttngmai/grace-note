import tw from 'twin.macro'
import Button from './Button'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight
} from '@tabler/icons-react'

type PaginationProps = {
  totalPages: number
  currentPage: number
  onPageChange: (page: number) => void
  pageGroupSize?: number
}

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
  pageGroupSize = 5
}: PaginationProps): JSX.Element {
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize)
  const startPage = currentGroup * pageGroupSize + 1
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages)

  const hasPrev = startPage > 1
  const hasNext = endPage < totalPages

  const handlePageClick = (page: number): void => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page)
    }
  }

  const pages: number[] = []
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  return (
    <div className="flex items-center">
      <div className="flex-1">
        {currentPage !== 1 && (
          <Button type="button" onClick={() => handlePageClick(1)} variant="ghost" size="icon">
            <IconChevronsLeft />
          </Button>
        )}
      </div>
      <div className="flex flex-3 justify-center items-center gap-8pxr">
        {hasPrev && (
          <Button
            type="button"
            onClick={() => handlePageClick(startPage - 1)}
            variant="ghost"
            size="icon"
          >
            <IconChevronLeft />
          </Button>
        )}
        {pages.map((page) => (
          <Button
            key={page}
            type="button"
            onClick={() => handlePageClick(page)}
            variant="ghost"
            size="sm"
            sx={page === currentPage ? tw`w-32pxr font-bold` : tw`w-32pxr`}
          >
            {page}
          </Button>
        ))}
        {hasNext && (
          <Button
            type="button"
            onClick={() => handlePageClick(endPage + 1)}
            variant="ghost"
            size="sm"
            sx={tw`w-32pxr`}
          >
            <IconChevronRight />
          </Button>
        )}
      </div>
      <div className="flex-1">
        {totalPages !== 0 && currentPage !== totalPages && (
          <Button
            type="button"
            onClick={() => handlePageClick(totalPages)}
            variant="ghost"
            size="icon"
          >
            <IconChevronsRight />
          </Button>
        )}
      </div>
    </div>
  )
}
