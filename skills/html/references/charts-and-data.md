# Charts and data

Read this when the artifact contains quantitative charts, metrics, tables, or a data-driven story.

Start with the comparison the viewer needs to make. Select the chart from that question rather than from visual novelty:

- Change over time → line, area, or aligned small multiples.
- Ranked magnitude → ordered bars or a table with visual emphasis.
- Part to whole → stacked bars when the denominator is meaningful; avoid decorative slices.
- Distribution → histogram, dot plot, box plot, or density view.
- Relationship → scatter plot with meaningful scales and annotations.
- Flow → Sankey or network only when path magnitude is genuinely the point.

Use a table when exact values matter more than shape. A chart and a compact table can coexist when they serve different reading needs.

## Make the data honest

- Label units, time ranges, sources, and important filters.
- Use scales that support the intended comparison. Make truncation or nonlinearity explicit.
- Separate measured values, estimates, targets, and forecasts visually and in text.
- Do not invent data to make the artifact look complete. Mark missing or illustrative values plainly.
- Keep color categories consistent and distinguishable without relying on color alone.
- Treat status colors separately from the general palette.
- Give dense data room; contain horizontal overflow rather than compressing labels into illegibility.

## Interaction

Tooltips should add precision, not carry facts that the chart otherwise fails to communicate. Keep essential values and conclusions available without hover.

Filters, brushing, zooming, and linked views should answer real follow-up questions. Show active filters and provide a clear reset. Preserve an accessible summary or table for data that is otherwise available only through pointer interaction.

Use animation to explain change between states, not to make bars and lines perform on arrival.
