var svg = d3.select("#my_dataviz")

// Handmade legend
svg.append("text").attr("x", 100).attr("y", 30).text("0%").style("font-size", "15px").attr("alignment-baseline","middle")
svg.append("circle").attr("cx",140).attr("cy",30).attr("r", 8).style("fill", "#ffffcc")
svg.append("circle").attr("cx",160).attr("cy",30).attr("r", 8).style("fill", "#ffefa5")
svg.append("circle").attr("cx",180).attr("cy",30).attr("r", 8).style("fill", "#fedc7f")
svg.append("circle").attr("cx",200).attr("cy",30).attr("r", 8).style("fill", "#febf5b")
svg.append("circle").attr("cx",220).attr("cy",30).attr("r", 8).style("fill", "#fd9d43")
svg.append("circle").attr("cx",240).attr("cy",30).attr("r", 8).style("fill", "#fc7034")
svg.append("circle").attr("cx",260).attr("cy",30).attr("r", 8).style("fill", "#f23d26")
svg.append("circle").attr("cx",280).attr("cy",30).attr("r", 8).style("fill", "#d91620")
svg.append("circle").attr("cx",300).attr("cy",30).attr("r", 8).style("fill", "#b40325")
svg.append("circle").attr("cx",320).attr("cy",30).attr("r", 8).style("fill", "#800026")
svg.append("text").attr("x", 340).attr("y", 30).text("100%").style("font-size", "15px").attr("alignment-baseline","middle")

