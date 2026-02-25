import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

export default function SAMDiagram({ sam }) {
  const svgRef = useRef();

  useEffect(() => {
    if (!sam) return;

    const width = 550;
    const height = 300;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const sankeyGenerator = sankey()
      .nodeWidth(20)
      .nodePadding(15)
      .extent([[1, 1], [width - 1, height - 6]]);

    const graph = sankeyGenerator({
      nodes: sam.nodes.map(d => Object.assign({}, d)),
      links: sam.links.map(d => Object.assign({}, d))
    });

    svg.attr("width", width).attr("height", height);

    // Links
    svg.append("g")
      .selectAll("path")
      .data(graph.links)
      .join("path")
      .attr("d", sankeyLinkHorizontal())
      .attr("stroke", "#3B82F6")
      .attr("stroke-width", d => d.width)
      .attr("fill", "none")
      .attr("opacity", 0.5);

    // Nodes
    svg.append("g")
      .selectAll("rect")
      .data(graph.nodes)
      .join("rect")
      .attr("x", d => d.x0)
      .attr("y", d => d.y0)
      .attr("height", d => d.y1 - d.y0)
      .attr("width", d => d.x1 - d.x0)
      .attr("fill", "#10B981");

    // Labels
    svg.append("g")
      .selectAll("text")
      .data(graph.nodes)
      .join("text")
      .attr("x", d => d.x0 - 6)
      .attr("y", d => (d.y1 + d.y0) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .text(d => d.name);

  }, [sam]);

  return <svg ref={svgRef}></svg>;
}
