"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, FolderTree, File, Folder, Info } from "lucide-react"
import { DashboardCard, CardTitle } from "./utils"

type TreeNodeType = "folder" | "file"

type TreeNode = {
  id: string
  name: string
  type: TreeNodeType
  size?: number
  children?: TreeNode[]
  metadata?: Record<string, any>
}

type HierarchicalTreeCardProps = {
  title: string
  subtitle?: string
  rootNode: TreeNode
  onNodeSelect?: (node: TreeNode) => void
}

const TreeNodeComponent = ({
  node,
  level = 0,
  expanded,
  toggleExpand,
  onSelect,
  selectedNode,
}: {
  node: TreeNode
  level?: number
  expanded: Record<string, boolean>
  toggleExpand: (id: string) => void
  onSelect: (node: TreeNode) => void
  selectedNode: TreeNode | null
}) => {
  const hasChildren = node.children && node.children.length > 0
  const isExpanded = expanded[node.id]
  const isSelected = selectedNode?.id === node.id

  // Format file size
  const formatSize = (size?: number) => {
    if (size === undefined) return ""

    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
  }

  return (
    <div>
      <motion.div
        className={`flex cursor-pointer items-center rounded-md px-2 py-1 ${
          isSelected ? "bg-primary/10 dark:bg-primary/20" : "hover:bg-slate-100 dark:hover:bg-slate-800"
        }`}
        onClick={() => onSelect(node)}
        whileHover={{ x: 2 }}
        transition={{ duration: 0.2 }}
      >
        {hasChildren && (
          <motion.button
            className="mr-1 p-0.5 text-muted-foreground hover:text-foreground"
            onClick={(e) => {
              e.stopPropagation()
              toggleExpand(node.id)
            }}
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronRight className="h-3 w-3" />
          </motion.button>
        )}

        {!hasChildren && <div className="mr-4 w-4" />}

        <div className="mr-2 text-muted-foreground">
          {node.type === "folder" ? <Folder className="h-4 w-4" /> : <File className="h-4 w-4" />}
        </div>

        <span className="flex-1 truncate text-sm">{node.name}</span>

        {node.size !== undefined && <span className="ml-2 text-xs text-muted-foreground">{formatSize(node.size)}</span>}
      </motion.div>

      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            className="ml-4 border-l pl-2 dark:border-slate-700"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            {node.children?.map((childNode) => (
              <TreeNodeComponent
                key={childNode.id}
                node={childNode}
                level={level + 1}
                expanded={expanded}
                toggleExpand={toggleExpand}
                onSelect={onSelect}
                selectedNode={selectedNode}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function HierarchicalTreeCard({ title, subtitle, rootNode, onNodeSelect }: HierarchicalTreeCardProps) {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    [rootNode.id]: true,
  })
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [showInfo, setShowInfo] = useState(false)

  // Toggle node expansion
  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  // Handle node selection
  const handleSelect = (node: TreeNode) => {
    setSelectedNode(node)
    if (onNodeSelect) onNodeSelect(node)
  }

  // Calculate total size
  const calculateTotalSize = (node: TreeNode): number => {
    let total = node.size || 0

    if (node.children) {
      total += node.children.reduce((sum, child) => sum + calculateTotalSize(child), 0)
    }

    return total
  }

  // Count items
  const countItems = (node: TreeNode): { files: number; folders: number } => {
    let files = node.type === "file" ? 1 : 0
    let folders = node.type === "folder" ? 1 : 0

    if (node.children) {
      node.children.forEach((child) => {
        const counts = countItems(child)
        files += counts.files
        folders += counts.folders
      })
    }

    return { files, folders }
  }

  const totalSize = calculateTotalSize(rootNode)
  const { files, folders } = countItems(rootNode)

  // Format file size
  const formatSize = (size: number) => {
    if (size < 1024) return `${size} B`
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`
  }

  return (
    <DashboardCard>
      <div className="flex items-center justify-between">
        <CardTitle title={title} subtitle={subtitle} className="mb-0" />

        <button
          className="flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-slate-100 hover:text-foreground dark:hover:bg-slate-800"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {showInfo && (
          <motion.div
            className="mt-2 rounded-lg bg-slate-100 p-3 text-sm text-muted-foreground dark:bg-slate-800"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="font-medium">Total size:</span> {formatSize(totalSize)}
              </div>
              <div>
                <span className="font-medium">Items:</span> {files} files, {folders} folders
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex">
        <div className="w-1/2 overflow-auto pr-2">
          <div className="mb-2 flex items-center gap-2 text-sm font-medium">
            <FolderTree className="h-4 w-4" />
            <span>Structure</span>
          </div>

          <div className="max-h-[300px] overflow-y-auto rounded-md border p-2 dark:border-slate-700">
            <TreeNodeComponent
              node={rootNode}
              expanded={expanded}
              toggleExpand={toggleExpand}
              onSelect={handleSelect}
              selectedNode={selectedNode}
            />
          </div>
        </div>

        <div className="w-1/2 pl-2">
          <div className="mb-2 text-sm font-medium">Details</div>

          {selectedNode ? (
            <div className="rounded-md border p-3 dark:border-slate-700">
              <div className="mb-2 flex items-center gap-2">
                {selectedNode.type === "folder" ? (
                  <Folder className="h-5 w-5 text-amber-500" />
                ) : (
                  <File className="h-5 w-5 text-blue-500" />
                )}
                <h3 className="text-base font-medium">{selectedNode.name}</h3>
              </div>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Type:</span>
                  <span className="font-medium">{selectedNode.type}</span>
                </div>

                {selectedNode.size !== undefined && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{formatSize(selectedNode.size)}</span>
                  </div>
                )}

                {selectedNode.children && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Contains:</span>
                    <span className="font-medium">
                      {selectedNode.children.length} item{selectedNode.children.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                )}

                {selectedNode.metadata && Object.keys(selectedNode.metadata).length > 0 && (
                  <>
                    <div className="my-2 border-t dark:border-slate-700" />
                    <div className="text-xs font-medium text-muted-foreground">Metadata</div>

                    {Object.entries(selectedNode.metadata).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-muted-foreground">{key}:</span>
                        <span className="font-medium">{value.toString()}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="flex h-[300px] items-center justify-center rounded-md border text-sm text-muted-foreground dark:border-slate-700">
              Select an item to view details
            </div>
          )}
        </div>
      </div>
    </DashboardCard>
  )
}

