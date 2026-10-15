# Diagrams, architecture, and sequences

Read this when relationships, flow, time, state, or structure are the main thing the artifact must explain.

## Choose the diagram before choosing the renderer

Name the question the viewer should be able to answer, then choose the visual grammar:

| Question | Useful grammar |
| --- | --- |
| What exists, and how is it connected? | Topology or system map |
| What happens over time? | Sequence, timeline, or request trace |
| What decisions or transformations occur? | Process flow |
| How can something change? | State diagram |
| What contains or owns what? | Hierarchy or nested boundary map |
| How do alternatives compare? | Matrix or aligned comparison |
| How much, how often, or how fast? | Quantitative chart; also read [`charts-and-data.md`](charts-and-data.md) |

Do not force several questions into one overloaded picture. Use coordinated views or selectable layers when the audience genuinely needs more than one.

## Choose the medium from the information

- **HTML and CSS:** strong for labeled regions, aligned comparisons, grids, timelines, and diagrams whose text needs to reflow.
- **SVG:** strong for crisp relational diagrams, custom paths, annotations, and interactive vector scenes.
- **Canvas:** strong for dense, frequently changing, or generative graphics where thousands of DOM nodes would be wasteful.
- **WebGL:** reserve for spatial, high-volume, or truly three-dimensional work that earns the added complexity.

Mix media when useful. A diagram can use semantic HTML controls and explanation around an SVG or Canvas stage.
Style SVG elements through CSS classes and the artifact's chosen tokens when practical so the scene remains coherent across states and themes.

## Make the structure legible

- Establish hierarchy with position, grouping, containment, scale, and whitespace before reaching for color.
- Keep labels readable at the default view. Do not rotate important prose or place text over busy paths.
- Route connectors around nodes and labels. Make direction unmistakable and distinguish different edge meanings.
- Use boundaries to communicate ownership, trust, deployment, or responsibility, not as decoration.
- Keep a stable overview while exposing detail on demand.
- For architecture, show the concepts the audience uses. File names and implementation classes belong only when the question is specifically about code structure.

Avoid the automatic architecture wallpaper of identical rounded boxes connected by arrows. Services, queues, actors, boundaries, stores, and transformations do not all need the same shape or visual weight.

## Sequence and interaction

Sequence should expose causality, not merely flash elements in order.

- Give steps durable labels and a visible current state.
- Let the viewer play, pause, restart, step, or choose a path when the sequence is more than a brief self-explanatory animation.
- Keep the full system understandable when animation is stopped.
- Use motion to trace requests, reveal transitions, or connect cause with effect. Respect `prefers-reduced-motion` with an immediate or step-based alternative.
- Use filtering and layer toggles when they reduce complexity without hiding necessary context.

If nodes expose details, make selection obvious. Floating panels must be dismissible and must reopen from the relevant node or control. Important information must remain reachable by keyboard.

## Pan and zoom only when needed

A clear diagram that fits should not become a map application. Add pan and zoom when the information space materially exceeds the viewport or close inspection is part of the task.

For an SVG stage:

- Transform one containing `<g>` rather than rewriting every node.
- Keep pointer, pan, and zoom math in a single coordinate system. Preserve the point under the cursor while zooming.
- Suppress click activation after a drag using a small movement threshold.
- Provide `grab` and `grabbing` feedback, a visible zoom level, and a reset control.
- Set useful minimum and maximum scales and ensure the initial fit is understandable.

## Verify the picture

Inspect the default overview, every interactive state, and any sequence endpoints. Check that connectors do not cross labels, arrows terminate cleanly, text remains legible, panels do not cover critical content, and narrow-screen behavior has an intentional fallback.
