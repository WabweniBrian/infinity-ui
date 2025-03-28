"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Check, X } from "lucide-react"

interface MatrixOption {
  id: string
  label: string
  description?: string
  icon?: React.ReactNode
}

interface MatrixFilterProps {
  rowOptions: MatrixOption[]
  columnOptions: MatrixOption[]
  onChange: (selectedCells: Array<{ row: string; column: string }>) => void
  initialSelected?: Array<{ row: string; column: string }>
  title?: string
  subtitle?: string
  allowMultiple?: boolean
  showLabels?: boolean
  cellRenderer?: (
    rowOption: MatrixOption,
    columnOption: MatrixOption,
    isSelected: boolean,
    onClick: () => void,
  ) => React.ReactNode
}

const MatrixFilter = ({
  rowOptions,
  columnOptions,
  onChange,
  initialSelected = [],
  title = "Matrix Filter",
  subtitle,
  allowMultiple = true,
  showLabels = true,
  cellRenderer,
}: MatrixFilterProps) => {
  const [selectedCells, setSelectedCells] = useState<Array<{ row: string; column: string }>>(initialSelected)

  useEffect(() => {
    onChange(selectedCells)
  }, [selectedCells, onChange])

  const isCellSelected = (rowId: string, columnId: string) => {
    return selectedCells.some((cell) => cell.row === rowId && cell.column === columnId)
  }

  const toggleCell = (rowId: string, columnId: string) => {
    const isSelected = isCellSelected(rowId, columnId)

    if (isSelected) {
      setSelectedCells((prev) => prev.filter((cell) => !(cell.row === rowId && cell.column === columnId)))
    } else {
      if (allowMultiple) {
        setSelectedCells((prev) => [...prev, { row: rowId, column: columnId }])
      } else {
        setSelectedCells([{ row: rowId, column: columnId }])
      }
    }
  }

  const clearSelection = () => {
    setSelectedCells([])
  }

  const getSelectedCount = () => {
    return selectedCells.length
  }

  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
            {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          </div>
          {getSelectedCount() > 0 && (
            <button
              onClick={clearSelection}
              className="text-sm text-indigo-600 hover:text-indigo-800 transition-colors flex items-center"
            >
              <X size={16} className="mr-1" />
              Clear ({getSelectedCount()})
            </button>
          )}
        </div>
      </div>

      <div className="p-4 overflow-x-auto">
        <div className="min-w-max">
          <div
            className="grid grid-cols-1"
            style={{ gridTemplateColumns: `auto repeat(${columnOptions.length}, minmax(80px, 1fr))` }}
          >
            {/* Header row with column labels */}
            <div className="contents">
              <div className="flex items-center justify-center p-2 font-medium text-gray-500 text-sm"></div>
              {columnOptions.map((column) => (
                <div key={column.id} className="flex flex-col items-center justify-center p-2 text-center">
                  {showLabels && <div className="font-medium text-gray-700 text-sm mb-1">{column.label}</div>}
                  {column.icon && <div className="text-gray-500">{column.icon}</div>}
                </div>
              ))}
            </div>

            {/* Matrix rows */}
            {rowOptions.map((row) => (
              <div key={row.id} className="contents">
                <div className="flex items-center p-2 border-t border-gray-100">
                  {showLabels && <div className="font-medium text-gray-700 text-sm mr-2">{row.label}</div>}
                  {row.icon && <div className="text-gray-500">{row.icon}</div>}
                </div>

                {columnOptions.map((column) => {
                  const isSelected = isCellSelected(row.id, column.id)
                  const handleClick = () => toggleCell(row.id, column.id)

                  if (cellRenderer) {
                    return (
                      <div key={column.id} className="border-t border-gray-100 p-2">
                        {cellRenderer(row, column, isSelected, handleClick)}
                      </div>
                    )
                  }

                  return (
                    <div key={column.id} className="border-t border-gray-100 p-2 flex items-center justify-center">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={handleClick}
                        className={`w-8 h-8 rounded-md flex items-center justify-center transition-colors ${
                          isSelected ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                        }`}
                      >
                        <AnimatePresence>
                          {isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <Check size={16} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MatrixFilter

