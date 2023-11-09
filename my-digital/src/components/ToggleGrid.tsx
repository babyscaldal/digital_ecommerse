import * as React from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"
import ViewColumnIcon from "@mui/icons-material/ViewColumn"
import WindowIcon from "@mui/icons-material/Window"
import ViewCompactIcon from "@mui/icons-material/ViewCompact"
import TableRowsIcon from "@mui/icons-material/TableRows"

interface IToggleGrid {
  onChange: (value: number) => void
  grid: number
}
export default function ToggleGrid({ grid, onChange }: IToggleGrid) {
  const [view, setView] = React.useState(grid)

  const handleChange = (_: React.MouseEvent<HTMLElement>, nextView: number) => {
    setView(nextView)
  }

  return (
    <ToggleButtonGroup
      value={view}
      exclusive
      onChange={handleChange}
      size="small"
    >
      <ToggleButton
        value={3}
        aria-label="grid-3"
        onClick={() => {
          onChange(3)
        }}
      >
        <ViewCompactIcon />
      </ToggleButton>
      <ToggleButton value={4} aria-label="grid-4" onClick={() => onChange(4)}>
        <ViewColumnIcon />
      </ToggleButton>
      <ToggleButton value={6} aria-label="grid-6" onClick={() => onChange(6)}>
        <WindowIcon />
      </ToggleButton>
      <ToggleButton
        value={12}
        aria-label="grid-12"
        onClick={() => onChange(12)}
      >
        <TableRowsIcon />
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
