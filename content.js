// ツールチップ用の1つだけの表示要素をページに追加
const tooltip = document.createElement("div");
tooltip.style.position = "fixed";
tooltip.style.padding = "4px 8px";
tooltip.style.fontSize = "10px";
tooltip.style.color = "#fff";
tooltip.style.backgroundColor = "rgba(0,0,0,0.75)";
tooltip.style.borderRadius = "4px";
tooltip.style.pointerEvents = "none";
tooltip.style.zIndex = "9999";
tooltip.style.transition = "opacity 0.2s ease";
tooltip.style.opacity = "0";
document.body.appendChild(tooltip);

// すべてのリンクに対してホバー検出
document.querySelectorAll("a[href]").forEach(link => {
  if (link.dataset.hoverSetup === "true") return;

  const href = link.href;
  const domainOnly = new URL(href).hostname;

  link.addEventListener("mouseenter", (e) => {
    tooltip.textContent = domainOnly;
    tooltip.style.left = `${e.clientX + 12}px`;
    tooltip.style.top = `${e.clientY + 12}px`;
    tooltip.style.opacity = "1";
  });

  link.addEventListener("mousemove", (e) => {
    tooltip.style.left = `${e.clientX + 12}px`;
    tooltip.style.top = `${e.clientY + 12}px`;
  });

  link.addEventListener("mouseleave", () => {
    tooltip.style.opacity = "0";
  });

  link.dataset.hoverSetup = "true";
});
