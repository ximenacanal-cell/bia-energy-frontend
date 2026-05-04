// NotificationsPage.module.scss
// Usa los tokens del design system de Bia

// ─── Animaciones ──────────────────────────────────────────────────────────────

@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to   { opacity: 1; transform: scale(1); }
}

// ─── Layout ───────────────────────────────────────────────────────────────────

.page {
  min-height: 100vh;
  background: var(--background-weak, #f7f8fc);
  font-family: 'Open Sauce One', system-ui, sans-serif;
}

// ─── Header ───────────────────────────────────────────────────────────────────

.header {
  background: var(--background-accent, #472bef);
  padding: 20px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  @media (max-width: 600px) {
    padding: 16px;
    flex-direction: column;
    align-items: flex-start;
  }
}

.headerLeft {
  display: flex;
  align-items: center;
  gap: 14px;
}

.logoBox {
  width: 44px;
  height: 44px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logoBolt {
  font-size: 22px;
}

.headerTitle {
  margin: 0;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: -0.02em;
}

.headerSub {
  margin: 2px 0 0;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.65);
}

.headerStats {
  display: flex;
  align-items: center;
  gap: 24px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 10px 20px;

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
  }
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
}

.statNum {
  font-size: 22px;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.statLabel {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.statDivider {
  width: 1px;
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
}

// ─── Main ─────────────────────────────────────────────────────────────────────

.main {
  max-width: 1100px;
  margin: 0 auto;
  padding: 24px 24px 40px;

  @media (max-width: 600px) {
    padding: 16px;
  }
}

// ─── Toolbar ──────────────────────────────────────────────────────────────────

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────

.tabs {
  display: flex;
  gap: 4px;
  background: var(--background-standard, #fff);
  border: 1px solid var(--border-standard, #cecfdb);
  border-radius: 10px;
  padding: 4px;
}

.tab,
.tabActive {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  border: none;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tab {
  background: transparent;
  color: var(--ink-weak, #6d7193);

  &:hover {
    background: var(--background-weak, #f7f8fc);
    color: var(--ink-standard, #20222e);
  }
}

.tabActive {
  background: var(--background-accent, #472bef);
  color: #fff;
  box-shadow: 0 2px 8px rgba(71, 43, 239, 0.3);
}

.tabBadge {
  background: rgba(255, 255, 255, 0.25);
  color: inherit;
  border-radius: 99px;
  padding: 1px 7px;
  font-size: 11px;
  font-weight: 700;
  min-width: 18px;
  text-align: center;

  .tab & {
    background: var(--greys-grey-20, #f0f1fa);
    color: var(--ink-weak, #6d7193);
  }
}

// ─── Actions ──────────────────────────────────────────────────────────────────

.actions {
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
}

.searchBox {
  position: relative;
  display: flex;
  align-items: center;
}

.searchIcon {
  position: absolute;
  left: 10px;
  font-size: 14px;
  pointer-events: none;
}

.searchInput {
  width: 220px;
  padding: 9px 32px 9px 32px;
  border: 1px solid var(--border-standard, #cecfdb);
  border-radius: 8px;
  font-size: 14px;
  background: var(--background-standard, #fff);
  color: var(--ink-standard, #20222e);
  transition: border-color 0.15s;

  &::placeholder {
    color: var(--ink-disabled, #dbdce9);
  }

  &:focus {
    outline: none;
    border-color: var(--border-accent, #472bef);
    box-shadow: 0 0 0 3px rgba(71, 43, 239, 0.08);
  }

  @media (max-width: 600px) {
    width: 100%;
  }
}

.clearSearch {
  position: absolute;
  right: 8px;
  background: none;
  border: none;
  color: var(--ink-weak, #6d7193);
  cursor: pointer;
  font-size: 12px;
  padding: 2px 4px;

  &:hover { color: var(--ink-standard, #20222e); }
}

// ─── Botones ──────────────────────────────────────────────────────────────────

.btnPrimary {
  padding: 9px 18px;
  background: var(--background-accent, #472bef);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;

  &:hover { background: #3922bf; transform: translateY(-1px); }
  &:active { transform: translateY(0); }
  &:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
}

.btnSecondary {
  padding: 9px 18px;
  background: transparent;
  color: var(--ink-standard, #20222e);
  border: 1px solid var(--border-standard, #cecfdb);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;

  &:hover { background: var(--background-weak, #f7f8fc); }
}

.btnDanger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 16px;
  transition: background 0.15s;

  &:hover { background: #ffe3e3; }
}

// ─── Search result info ───────────────────────────────────────────────────────

.searchResult {
  font-size: 13px;
  color: var(--ink-weak, #6d7193);
  margin-bottom: 12px;
  animation: fadeIn 0.2s ease;
}

.noResults {
  text-align: center;
  padding: 48px;
  color: var(--ink-weak, #6d7193);
  font-size: 15px;
}

// ─── Tabla ────────────────────────────────────────────────────────────────────

.tableWrapper {
  background: var(--background-standard, #fff);
  border-radius: 12px;
  border: 1px solid var(--border-standard, #cecfdb);
  overflow: hidden;
  animation: fadeIn 0.25s ease;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;

  th {
    text-align: left;
    padding: 12px 16px;
    font-size: 12px;
    font-weight: 600;
    color: var(--ink-weak, #6d7193);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: var(--background-weak, #f7f8fc);
    border-bottom: 1px solid var(--border-standard, #cecfdb);
  }

  td {
    padding: 14px 16px;
    font-size: 14px;
    color: var(--ink-standard, #20222e);
    border-bottom: 1px solid var(--greys-grey-20, #f0f1fa);
    vertical-align: middle;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #fafaff;
  }
}

.tdStrong {
  font-weight: 600;
  color: var(--ink-strong, #08080a) !important;
}

.tdMuted {
  color: var(--ink-weak, #6d7193) !important;
}

// ─── Cards Grid ───────────────────────────────────────────────────────────────

.cardsGrid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
  animation: fadeIn 0.25s ease;
}

.card {
  background: var(--background-standard, #fff);
  border: 1px solid var(--border-standard, #cecfdb);
  border-radius: 12px;
  padding: 18px;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--border-accent, #472bef);
    box-shadow: 0 4px 16px rgba(71, 43, 239, 0.1);
    transform: translateY(-2px);
  }
}

.cardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}

.cardCategory {
  font-size: 11px;
  font-weight: 600;
  color: var(--ink-accent, #472bef);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.cardName {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 600;
  color: var(--ink-strong, #08080a);
  line-height: 1.3;
}

.cardPrice {
  margin: 0 0 12px;
  font-size: 20px;
  font-weight: 700;
  color: var(--ink-accent, #472bef);
  letter-spacing: -0.02em;
}

.cardFooter {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

// ─── Modal ────────────────────────────────────────────────────────────────────

.backdrop {
  position: fixed;
  inset: 0;
  background: rgba(8, 8, 10, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
  animation: fadeIn 0.15s ease;
}

.modal {
  background: var(--background-standard, #fff);
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 60px rgba(8, 8, 10, 0.25);
  animation: scaleIn 0.2s ease;
  overflow: hidden;
}

.modalHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--border-standard, #cecfdb);
  font-size: 16px;
  font-weight: 700;
  color: var(--ink-strong, #08080a);
}

.closeBtn {
  background: none;
  border: none;
  font-size: 16px;
  color: var(--ink-weak, #6d7193);
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 6px;
  transition: all 0.15s;

  &:hover {
    background: var(--background-weak, #f7f8fc);
    color: var(--ink-standard, #20222e);
  }
}

.modalBody {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.formError {
  padding: 10px 14px;
  background: #ffe3e3;
  border-radius: 8px;
  border-left: 3px solid #ff4242;
  font-size: 13px;
  color: #661a1a;
  font-weight: 500;
}

.label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: var(--ink-standard, #20222e);
}

.input {
  padding: 10px 12px;
  border: 1px solid var(--border-standard, #cecfdb);
  border-radius: 8px;
  font-size: 14px;
  color: var(--ink-standard, #20222e);
  background: var(--background-standard, #fff);
  transition: border-color 0.15s;

  &::placeholder {
    color: var(--ink-disabled, #dbdce9);
  }

  &:focus {
    outline: none;
    border-color: var(--border-accent, #472bef);
    box-shadow: 0 0 0 3px rgba(71, 43, 239, 0.08);
  }
}

.row2 {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
}

.modalFooter {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 8px;
  border-top: 1px solid var(--greys-grey-20, #f0f1fa);
  margin-top: 4px;
}
