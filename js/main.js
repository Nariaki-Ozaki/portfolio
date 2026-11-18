// このファイルはスマートフォンのハンバーガーメニュー専用です。
// 作品の画像・名前・説明は index.html と works.html で編集します。

const menu = document.querySelector("#mobile-menu"),
  toggle = document.querySelector(".menu-toggle"),
  close = document.querySelector(".menu-close");
let previousFocus;
// メニューの表示、背景のスクロール、キーボード操作をまとめて切り替えます。
function setMenu(open) {
  if (open) previousFocus = document.activeElement;
  menu.hidden = !open;
  toggle.setAttribute("aria-expanded", String(open));
  document.body.classList.toggle("menu-open", open);
  // 背面のコンテンツにキーボードフォーカスが移動しないようにします。
  document
    .querySelectorAll(
      "body > header, body > main, body > .footer-spacer, body > footer",
    )
    .forEach((el) => (el.inert = open));
  if (open) close.focus();
  else if (previousFocus?.isConnected) previousFocus.focus();
}
toggle?.addEventListener("click", () => setMenu(true));
close?.addEventListener("click", () => setMenu(false));
menu
  ?.querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", () => setMenu(false)));
menu?.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    setMenu(false);
  }
  if (event.key === "Tab") {
    const list = [...menu.querySelectorAll("button,a")];
    const first = list[0],
      last = list.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});
matchMedia("(min-width:641px)").addEventListener("change", (event) => {
  if (event.matches && !menu.hidden) setMenu(false);
});
