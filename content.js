// ツールチップ要素の作成
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
tooltip.style.transition = 'opacity 0.2s ease';
tooltip.style.maxWidth = '300px';
tooltip.style.whiteSpace = 'nowrap';
tooltip.style.overflow = 'hidden';
tooltip.style.textOverflow = 'ellipsis';
document.body.appendChild(tooltip);

// マウスオーバー時：リンクがあるなら表示＆更新
document.addEventListener('mouseover', (event) => {
  const link = event.target.closest('a');
  if (link && link.href) {
    try {
      const url = new URL(link.href);
      tooltip.textContent = url.hostname;
      tooltip.style.backgroundColor = url.protocol === 'https:' ? '#ccffcc' : '#ffcccc';
      tooltip.style.display = 'block';
      tooltip.style.opacity = '1';
    } catch {
      tooltip.style.display = 'none';
    }
  }
});

// マウス移動：ツールチップ位置を更新
document.addEventListener('mousemove', (event) => {
  tooltip.style.left = `${event.clientX + 12}px`;
  tooltip.style.top = `${event.clientY + 12}px`;
});

// マウスがリンク以外に離れたら非表示
document.addEventListener('mouseout', (event) => {
  const fromLink = event.target.closest('a');
  const toLink = event.relatedTarget?.closest?.('a');

  // 別のリンクに移動したときは消さない
  if (fromLink && toLink !== fromLink) {
    tooltip.style.opacity = '0';
    setTimeout(() => {
      tooltip.style.display = 'none';
    }, 200);
  }
});
