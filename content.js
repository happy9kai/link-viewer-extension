// ツールチップの作成
const tooltip = document.createElement('div');
tooltip.style.position = 'fixed';
tooltip.style.zIndex = '9999';
tooltip.style.padding = '6px 10px';
tooltip.style.borderRadius = '6px';
tooltip.style.fontSize = '12px';
tooltip.style.color = '#000';
tooltip.style.fontWeight = 'bold';
tooltip.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
tooltip.style.pointerEvents = 'none';
tooltip.style.display = 'none';
tooltip.style.transition = 'opacity 0.15s ease';
tooltip.style.maxWidth = '300px';
tooltip.style.whiteSpace = 'nowrap';
tooltip.style.overflow = 'hidden';
tooltip.style.textOverflow = 'ellipsis';
document.body.appendChild(tooltip);

// 安全判定（https: なら true）
function isSecure(link) {
  try {
    const url = new URL(link.href);
    return url.protocol === 'https:';
  } catch {
    return false;
  }
}

let currentLink = null;

// mouseover：リンクに乗ったとき
document.addEventListener('mouseover', (event) => {
  const link = event.target.closest('a');
  if (!link || !link.href) return;

  if (link !== currentLink) {
    currentLink = link;
    try {
      const url = new URL(link.href);
      tooltip.textContent = url.hostname;
      tooltip.style.backgroundColor = isSecure(link) ? '#ccffcc' : '#ffcccc';
      tooltip.style.opacity = '1';
      tooltip.style.display = 'block';
    } catch {
      tooltip.style.display = 'none';
    }
  }
});

// mouseout：リンクから出たとき
document.addEventListener('mouseout', (event) => {
  const leftLink = event.target.closest('a');
  const toLink = event.relatedTarget?.closest?.('a');

  // 違うリンクに移動した場合は表示を維持
  if (leftLink && leftLink === currentLink && toLink !== currentLink) {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      if (tooltip.style.opacity === '0') {
        tooltip.style.display = 'none';
        currentLink = null;
      }
    }, 150);
  }
});

// mousemove：ツールチップ位置追従
document.addEventListener('mousemove', (event) => {
  tooltip.style.left = `${event.clientX + 12}px`;
  tooltip.style.top = `${event.clientY + 12}px`;
});
